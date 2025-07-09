package org.project.tripus.service.file;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import javax.imageio.ImageIO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.project.tripus.global.enums.ErrorCode;
import org.project.tripus.global.enums.FileType;
import org.project.tripus.global.exception.CustomException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class S3Service implements FileService {

    private final S3Client s3Client;
    private final ExecutorService executorService = Executors.newFixedThreadPool(5);

    private static final int WIDTH = 1000;
    private static final int HEIGHT = 1000;
    private static final String FORMAT = "jpg";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * 여러 리뷰 이미지를 병렬로 S3에 업로드합니다.
     * 각 파일은 최대 5개의 스레드에서 병렬로 처리됩니다.
     *
     * @param files 업로드할 이미지 파일 리스트
     * @return 업로도된 이미지들의 key 리스트
     */
    public List<String> uploadReviewImage(List<MultipartFile> files) {
        List<Future<String>> futures = new ArrayList<>();

        for(MultipartFile file : files) {
            futures.add(executorService.submit(() -> uploadReviewImage(file)));
        }

        List<String> keys = new ArrayList<>();

        for(Future<String> future : futures) {
            try {
                keys.add(future.get());
            } catch(ExecutionException | InterruptedException e) {
                throw new CustomException(ErrorCode.FILE_UPLOAD_FAILED);
            }
        }

        return keys;
    }

    /**
     * 단일 리뷰 이미지를 S3에 업로드합니다.
     * 파일명은 {@code review/UUID_원본파일명} 형식의 S3 key로 저장됩니다.
     *
     * @param file 업로드할 이미지 파일
     * @return 업로도된 이미지의 key
     */
    public String uploadReviewImage(MultipartFile file) {
        // 파일명 형식 : review/UUID_원본파일명
        String key = FileType.REVIEW_IMAGE.getFolder() + UUID.randomUUID() + "_" + file.getOriginalFilename();
        return resizeAndUpload(file, key);
    }

    /**
     * 이미지 파일을 리사이징 후 S3에 업로드합니다.
     *
     * @param file 업로드할 이미지 파일
     * @param key  저장할 key
     * @return 업로도된 이미지의 key
     */
    private String resizeAndUpload(MultipartFile file, String key) {
        try {
            // 리사이즈
            BufferedImage originalImage = ImageIO.read(file.getInputStream());

            ByteArrayOutputStream os = new ByteArrayOutputStream();
            Thumbnails.of(originalImage)
                .size(WIDTH, HEIGHT)
                .keepAspectRatio(true)
                .outputFormat(FORMAT)
                .toOutputStream(os);

            byte[] resizedBytes = os.toByteArray();
            InputStream resizedInputStream = new ByteArrayInputStream(resizedBytes);

            // 업로드
            return upload(key, resizedInputStream, resizedBytes.length);
        } catch(IOException e) {
            throw new CustomException(ErrorCode.FILE_UPLOAD_FAILED);
        }
    }

    /**
     * 지정된 key로 S3에 파일을 업로드합니다.
     *
     * @param key 저장할 key
     * @param inputStream 업로드할 파일의 입력 스트림
     * @param contentLength 업로드할 파일의 바이트 길이
     * @return 업로도된 파일의 key
     * @throws IOException S3에 업로드 중 오류 발생 시
     */
    private String upload(String key, InputStream inputStream, long contentLength) throws IOException {
        PutObjectRequest request = PutObjectRequest.builder()
            .bucket(bucket)
            .key(key)
            .contentType("image/jpeg")
            .contentLength(contentLength)
            .build();

        s3Client.putObject(request, RequestBody.fromInputStream(inputStream, contentLength));

        return key;
    }

    /**
     * 여러 개의 파일을 S3에서 일괄 삭제합니다.
     *
     * @param keys 삭제할 파일들의 key 리스트
     */
    public void delete(List<String> keys) {
        keys.forEach(this::delete);
    }

    /**
     * 파일을 S3에서 삭제합니다.
     *
     * @param key 삭제할 파일의 key
     */
    public void delete(String key) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
            .bucket(bucket)
            .key(key)
            .build();

        s3Client.deleteObject(request);
    }
}
