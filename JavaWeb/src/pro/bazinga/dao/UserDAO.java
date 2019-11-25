package pro.bazinga.dao;

import pro.bazinga.domain.User;

import java.util.List;

public interface UserDAO {
    public List<User> findAll();
    public User findUserByNameAndPwd(String name,String pwd);
}
