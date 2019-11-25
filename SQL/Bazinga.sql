create database Bazinga;
use Bazinga;
/*<!--rename database MyWebSite to Bazinga;-->*/
create table USERS(
uid bigint not null primary key,
u_name varchar(10) not null default "",
vip tinyint not null default 0
)engine=innodb charset=utf8;


desc USERS;
insert into USERS values
(18846080719,'高冉',1);
select * from USERS;

/*安全信息*/
create table SEC_MSG(
uid bigint not null primary key,
password char(32) not null
)engine=innodb charset=utf8;

insert into SEC_MSG values
(18846080719,'ce519c4135001a1f0a958ccd0a9ab991');

select USERS.*,SEC_MSG.password from USERS 
left join SEC_MSG on 
USERS.uid = SEC_MSG.uid;


desc USERS;
desc SEC_MSG;
insert into USERS values('hrx','郝瑞雪',0);
insert into SEC_MSG values('hrx','fae0b27c451c728867a567e8c1bb4e53');
update SEC_MSG set password='fae0b27c451c728867a567e8c1bb4e53'where uid='hrx';

alter table SEC_MSG modify uid char(20) not null;

