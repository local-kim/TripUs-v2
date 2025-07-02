package org.project.tripus.service.file;

import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;
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

    private static final int WIDTH = 1000;
    private static final int HEIGHT = 1000;
    private static final String FORMAT = "jpg";

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String uploadReviewImage(MultipartFile file) {
        // 파일명 형식 : review/UUID_원본파일명
        String key = FileType.REVIEW_IMAGE.getFolder() + UUID.randomUUID() + "_" + file.getOriginalFilename();
        return resizeAndUpload(file, key);
    }

    public List<String> uploadReviewImage(List<MultipartFile> files) {
        return files.stream().map(this::uploadReviewImage).toList();
    }

    private String resizeAndUpload(MultipartFile file, String key) {
        try {
            // 리사이즈
            BufferedImage originalImage = null;
            originalImage = ImageIO.read(file.getInputStream());

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

    public void delete(String key) {
        DeleteObjectRequest request = DeleteObjectRequest.builder()
            .bucket(bucket)
            .key(key)
            .build();

        s3Client.deleteObject(request);
    }

    public void delete(List<String> keys) {
        keys.forEach(this::delete);
    }
}
