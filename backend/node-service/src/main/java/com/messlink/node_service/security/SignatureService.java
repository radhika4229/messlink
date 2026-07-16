
package com.messlink.node_service.security;

import com.messlink.node_service.entity.MeshMessage;
import org.springframework.stereotype.Service;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Service
public class SignatureService {

     private static final String SHARED_SECRET = "messlink-demo-secret-key";
    private static final String ALGORITHM = "HmacSHA256";

    public String sign(MeshMessage message) {
        try {
            String data = message.getMessageId() + message.getSenderId() + message.getPayload();
            Mac mac = Mac.getInstance(ALGORITHM);
            mac.init(new SecretKeySpec(SHARED_SECRET.getBytes(), ALGORITHM));
            byte[] rawHmac = mac.doFinal(data.getBytes());
            return Base64.getEncoder().encodeToString(rawHmac);
        } catch (Exception e) {
            throw new RuntimeException("Failed to sign message", e);
        }
    }

    public boolean verify(MeshMessage message) {
        if (message.getSignature() == null) return false;
        String expected = sign(message);
        return expected.equals(message.getSignature());
    }
}