package dev.simplesolution;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import dev.simplesolution.entity.User;
import dev.simplesolution.repository.UserRepository;

@Component
public class TestRedisDataStore implements CommandLineRunner {

    // Logger should be declared as a static final field
    private static final Logger logger = LoggerFactory.getLogger(TestRedisDataStore.class);

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Creating a sample user
        User user = new User();
        user.setId(100L);
        user.setUsername("john");
        user.setFirstName("John");
        user.setLastName("Doe");

        // Save user to Redis repository
        userRepository.save(user);

        // Retrieve all users and log them
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);

        for (User item : users) {
            logger.info("User: " + item.toString());
        }
    }
}
