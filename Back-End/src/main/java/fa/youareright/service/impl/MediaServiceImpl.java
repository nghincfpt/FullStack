package fa.youareright.service.impl;

import fa.youareright.repository.MediaRepository;
import fa.youareright.service.MediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MediaServiceImpl implements MediaService {

    @Autowired
    MediaRepository mediaRepository;

    @Override
    public void delete(String branchId) {
        mediaRepository.deleteByBranchId(branchId);
    }
}
