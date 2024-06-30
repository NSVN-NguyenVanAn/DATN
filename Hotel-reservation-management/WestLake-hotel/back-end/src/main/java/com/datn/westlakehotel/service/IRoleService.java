package com.datn.westlakehotel.service;

import com.datn.westlakehotel.model.Role;
import com.datn.westlakehotel.model.User;

import java.util.List;

/**
 * @author Nguyen Van An
 */

public interface IRoleService {
    List<Role> getRoles();
    Role createRole(Role theRole);

    void deleteRole(Long id);
    Role findByName(String name);

    User removeUserFromRole(Long userId, Long roleId);
    User assignRoleToUser(Long userId, Long roleId);
    Role removeAllUsersFromRole(Long roleId);
}
