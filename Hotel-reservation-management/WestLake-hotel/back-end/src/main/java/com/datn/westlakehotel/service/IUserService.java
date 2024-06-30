package com.datn.westlakehotel.service;

import com.datn.westlakehotel.model.User;

import java.util.List;

/**
 * @author Nguyen Van An
 */

public interface IUserService {
    User registerUser(User user);
    List<User> getUsers();
    void deleteUser(String email);
    User getUser(String email);
}
