package com.proj.backend.testServices;



import com.proj.backend.EXception.DataInvalid;
import com.proj.backend.Entities.User;
import com.proj.backend.Repositories.UserRepository;
import com.proj.backend.Services.UserService;
import com.proj.backend.auth.AuthenticationSercvice;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationSercvice authenticationSercvice;

    @InjectMocks
    private UserService userService; // Injectation des mocks dans UserService

    private User user;

    @BeforeEach
    void setUp() {
        user = User.builder()
                .id(1)
                .email("test@example.com")
                .password("password123")
                .build();
    }

    @Test
    void testRegisterUser_Success() throws DataInvalid {
        when(authenticationSercvice.register(user)).thenReturn(user);

        User result = userService.registerUser(user);

        assertNotNull(result);
        assertEquals("test@example.com", result.getEmail());

        verify(authenticationSercvice, times(1)).register(user);
    }

    @Test
    void testRegisterUser_NullUser_ThrowsException() {
        Exception exception = assertThrows(DataInvalid.class, () -> userService.registerUser(null));
        assertEquals("Il faut remplir les champs !!", exception.getMessage());
    }

    @Test
    void testIsEmailTaken_True() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        boolean isTaken = userService.isEmailTaken("test@example.com");

        assertTrue(isTaken);
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testIsEmailTaken_False() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        boolean isTaken = userService.isEmailTaken("test@example.com");

        assertFalse(isTaken);
        verify(userRepository, times(1)).findByEmail("test@example.com");
    }

    @Test
    void testDeleteUser_UserExists() throws DataInvalid {
        when(userRepository.existsById(1)).thenReturn(true);

        userService.deleteUser(1);

        verify(userRepository, times(1)).deleteById(1);
    }

    @Test
    void testDeleteUser_UserNotFound_ThrowsException() {
        when(userRepository.existsById(1)).thenReturn(false);

        Exception exception = assertThrows(DataInvalid.class, () -> userService.deleteUser(1));
        assertEquals(" User with id 1 does not exist ", exception.getMessage());
    }

    @Test
    void testEditUser_Success() {
        User updatedUser = User.builder()
                .email("updated@example.com")
                .password("newpassword")
                .build();

        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.editUser(1, updatedUser);

        assertNotNull(result);
        assertEquals("updated@example.com", result.getEmail());
        assertEquals("newpassword", result.getPassword());
    }

    @Test
    void testEditUser_UserNotFound_ThrowsException() {
        when(userRepository.findById(1)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> userService.editUser(1, user));
        assertTrue(exception.getMessage().contains("User non trouvée avec l'ID"));
    }

}
