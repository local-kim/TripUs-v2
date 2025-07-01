package org.project.tripus.service.file;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface FileService {

    String uploadReviewImage(MultipartFile file);

    List<String> uploadReviewImage(List<MultipartFile> files);

    void delete(String fileName);

    void delete(List<String> fileNames);
}
