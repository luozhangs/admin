/*
Navicat MySQL Data Transfer

Source Server         : zhang
Source Server Version : 50045
Source Host           : localhost:3306
Source Database       : admin

Target Server Type    : MYSQL
Target Server Version : 50045
File Encoding         : 65001

Date: 2018-01-26 11:39:18
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin_account`
-- ----------------------------
DROP TABLE IF EXISTS `admin_account`;
CREATE TABLE `admin_account` (
  `id` bigint(20) NOT NULL auto_increment COMMENT '主键',
  `login_name` varchar(64) default NULL COMMENT '登录名',
  `real_name` varchar(64) default NULL COMMENT '真实名字',
  `password` varchar(256) default NULL COMMENT '密码',
  `salt` varchar(256) default NULL COMMENT '加密盐',
  `account_type` varchar(64) default NULL COMMENT '账户类型',
  `descn` varchar(256) default NULL COMMENT '描述',
  `pic_url` varchar(256) default NULL COMMENT '头像',
  `skin` varchar(64) default NULL COMMENT '皮肤',
  `sex` tinyint(1) default '1' COMMENT '性别',
  `phone` varchar(32) default NULL COMMENT '手机号',
  `email` varchar(64) default NULL COMMENT '邮箱',
  `identity_card` varchar(64) default NULL COMMENT '身份证号',
  `sort` bigint(20) default '1' COMMENT '排序字段， 默认为1',
  `status` bigint(20) default '1' COMMENT '状态字段 默认为1',
  `is_valid` tinyint(1) default '1' COMMENT '是否有效字段，默认为1有效',
  `is_delete` tinyint(1) default '0' COMMENT '逻辑删除字段，默认为0',
  `role_id` bigint(20) default NULL COMMENT '角色id',
  `dept_id` bigint(20) NOT NULL COMMENT '部门id',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '时间戳，自动更新时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_account
-- ----------------------------
INSERT INTO `admin_account` VALUES ('1', 'root', '超级管理员', 'a3caed36f0fe5a01e5f144db8927235e', 'rootaviptcare', '', '', '', null, '1', '', '', '', '1', '1', '1', '0', '1', '1', null, '2018-01-24 10:52:44', '2018-01-24 10:52:44');

-- ----------------------------
-- Table structure for `admin_dept`
-- ----------------------------
DROP TABLE IF EXISTS `admin_dept`;
CREATE TABLE `admin_dept` (
  `id` bigint(20) NOT NULL auto_increment COMMENT '主键',
  `pid` bigint(20) default '0' COMMENT '默认为0，0位父节点',
  `title` varchar(64) NOT NULL COMMENT '部门名称',
  `is_valid` tinyint(4) default '1' COMMENT '是否可用  默认为1',
  `descn` varchar(128) default NULL COMMENT '描述',
  `is_delete` tinyint(4) default '0' COMMENT '逻辑删除，默认为0',
  `sort` bigint(20) default NULL COMMENT '排序所用字段',
  `status` bigint(20) default '1' COMMENT '状态 默认为1',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '时间戳，自动更新时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_dept
-- ----------------------------
INSERT INTO `admin_dept` VALUES ('1', '0', '品泰', '1', '标题一', '0', '1234', '1', null, '2017-12-05 09:13:06', '2017-12-22 17:27:24');
INSERT INTO `admin_dept` VALUES ('2', '1', '迈星行', '1', '标题二', '0', '12345', '1', null, '2017-12-05 09:13:17', '2017-12-22 17:27:24');

-- ----------------------------
-- Table structure for `admin_resources`
-- ----------------------------
DROP TABLE IF EXISTS `admin_resources`;
CREATE TABLE `admin_resources` (
  `id` bigint(20) NOT NULL auto_increment COMMENT 'Id',
  `name` varchar(64) character set utf8 NOT NULL COMMENT '菜单名字',
  `pid` bigint(32) NOT NULL default '0' COMMENT '父Id',
  `layer` bigint(20) NOT NULL default '1',
  `type` bigint(4) NOT NULL default '1' COMMENT '资源类型(1:为菜单，2:功能，3:按钮4：权限)',
  `res_url` varchar(512) character set utf8 default NULL COMMENT '菜单链接',
  `btn_type` varchar(64) character set utf8 default NULL,
  `icon` varchar(128) character set utf8 default NULL COMMENT '菜单Icon',
  `sort` bigint(20) default NULL COMMENT '菜单顺序(由小到大排列)',
  `is_valid` bigint(2) default '1' COMMENT '是否有效(1:有效,0:无效)',
  `descn` varchar(200) character set utf8 default NULL COMMENT '描述',
  `is_delete` tinyint(1) NOT NULL default '0' COMMENT '逻辑删除状态',
  `status` bigint(20) default '1' COMMENT '状态',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of admin_resources
-- ----------------------------
INSERT INTO `admin_resources` VALUES ('1', '增加', '6', '1', '2', '/account/add', 'private-add-btn', null, '1', '1', '', '0', null, null, '2017-12-02 10:01:58', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('2', '删除', '27', '1', '3', '/resources/del', 'private-del-btn', null, '3', '1', '', '0', '1', null, '2017-12-05 16:34:50', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('3', '权限管理', '0', '1', '1', '', 'private--btn', null, '5', '1', '', '0', '1', null, '2017-12-20 17:40:08', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('4', '菜单管理', '3', '1', '1', '/html/resource/resource.html', 'private--btn', null, null, '1', '', '0', '1', null, '2017-12-23 17:39:40', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('5', '角色管理', '38', '1', '4', '/role/page', 'private--btn', null, null, '1', '', '0', '1', null, '2017-11-29 13:54:59', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('6', '账户列表', '39', '1', '4', '/account/page', 'private--btn', null, '1', '1', '', '0', '1', null, '2017-11-29 13:57:34', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('7', '查询', '27', '1', '3', '/resources/get', 'private-get-btn', null, '1', '1', '', '0', '1', null, '2017-11-29 14:58:33', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('8', '查询', '5', '1', '3', '/role/get', 'private-get-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 14:56:54', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('9', '查询', '6', '1', '3', '/account/get', 'private-get-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 12:00:06', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('10', '添加', '27', '1', '2', '/resources/add', 'private-add-btn', null, null, '1', '', '0', '1', null, '2017-11-28 19:54:04', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('11', '添加', '5', '1', '2', '/role/add', 'private-add-btn', null, null, '1', '', '0', '1', null, '2017-11-28 19:51:46', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('13', '修改', '27', '1', '3', '/resources/update', 'private-edit-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 14:58:43', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('14', '修改', '5', '1', '3', '/role/update', 'private-edit-btn', null, '3', '1', '', '0', '1', null, '2017-11-29 14:57:04', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('16', '删除', '6', '1', '3', '/account/del', 'private-del-btn', null, '3', '1', '', '0', '1', null, '2017-12-05 16:34:16', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('17', '删除', '5', '1', '3', '/role/del', 'private-del-btn', null, '4', '1', '', '0', '1', null, '2017-12-05 16:33:41', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('19', '部门管理', '39', '1', '4', '/dept/get/tree', 'private--btn', null, null, '1', '', '0', '1', null, '2017-11-29 13:57:51', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('24', '修改', '6', '1', '3', '/account/update', 'private-edit-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 11:59:32', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('26', '添加', '19', '1', '2', '/dept/add', 'private-add-btn', null, null, '1', '', '0', '1', null, '2017-11-28 19:53:40', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('27', '列表查询', '4', '1', '4', '/resources/menu/list', null, null, null, '1', null, '0', '1', null, null, '2017-12-22 17:27:35');
INSERT INTO `admin_resources` VALUES ('30', '密码', '6', '1', '3', '/account/sys/reset/pwd', 'private-edit-pwd-btn', null, '1', '1', '', '0', '1', null, '2017-12-18 10:02:32', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('31', '修改', '19', '1', '2', '/dept/update', 'private-edit-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 12:01:59', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('32', '角色分类管理', '38', '1', '4', '/role/type/type/tree', 'private--btn', null, '2', '1', '', '0', '1', null, '2017-11-29 13:55:22', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('34', '添加', '32', '1', '2', '/role/type/add', 'private-add-btn', null, '1', '1', '', '0', '1', null, '2017-11-29 12:04:17', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('35', '修改', '32', '1', '2', '/role/type/update', 'private-edit-btn', null, '2', '1', '', '0', '1', null, '2017-11-29 12:54:08', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('37', '授权', '5', '1', '3', '/role/save/authorized', 'private-edit-rule-btn', null, '1', '1', '', '0', '1', null, '2017-11-29 13:52:23', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('38', '角色权限管理', '3', '1', '1', '/html/roleRefResource/roleRefResource.html', 'private--btn', null, null, '1', '', '0', '1', null, '2017-12-26 16:50:56', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('39', '账户管理', '3', '1', '1', '/html/account/account.html', 'private--btn', null, '1', '1', '', '0', '1', null, '2017-12-26 16:56:56', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('41', '刷新', '27', '1', '2', '', 'private-refresh-btn', null, '3', '1', '', '0', '1', null, '2017-11-29 15:56:07', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('42', '删除', '32', '1', '2', '/role/type/del', 'private-del-btn', null, '3', '1', '', '0', '1', null, '2017-12-05 16:33:53', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('43', '删除', '19', '1', '2', '/dept/del', 'private-del-btn', null, '3', '1', '', '0', '1', null, '2017-12-05 16:34:04', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('44', '菜单树', '0', '1', '4', '/resources/resAuthorized', 'private--btn', null, '999', '1', '', '0', '1', null, '2017-12-20 17:12:06', '2018-01-25 16:14:38');
INSERT INTO `admin_resources` VALUES ('45', '菜单功能按钮', '4', '1', '4', '/resources/index', 'private--btn', null, null, '1', '', '0', '1', null, '2017-12-20 17:12:30', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('46', '上级资源树', '0', '1', '4', '/resources/listResources', 'private--btn', null, '999', '1', '', '0', '1', null, '2017-12-20 17:12:49', '2018-01-25 16:15:17');
INSERT INTO `admin_resources` VALUES ('49', '授权列表', '5', '4', '4', '/role/list/authorized', 'private--btn', null, null, '1', '', '0', '1', null, '2017-12-22 17:56:48', '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('52', '账户角色树', '6', '1', '4', '/role/type/role/tree', 'private--btn', null, null, '1', '', '0', '1', null, null, '2018-01-16 15:48:43');
INSERT INTO `admin_resources` VALUES ('54', '按钮查询', '0', '1', '4', '/resources/findBtn', 'private--btn', null, '999', '1', '', '0', '1', null, '2017-12-21 18:57:07', '2018-01-25 16:14:22');

-- ----------------------------
-- Table structure for `admin_resource_ref_role`
-- ----------------------------
DROP TABLE IF EXISTS `admin_resource_ref_role`;
CREATE TABLE `admin_resource_ref_role` (
  `id` bigint(20) NOT NULL auto_increment,
  `role_id` bigint(20) NOT NULL COMMENT '角色ID',
  `resources_id` bigint(20) NOT NULL COMMENT '权限ID',
  `is_delete` tinyint(1) NOT NULL default '0' COMMENT '逻辑删除状态',
  `sort_weight` bigint(20) default NULL COMMENT '排序权重',
  `status` bigint(20) default '1' COMMENT '状态',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_resource_ref_role
-- ----------------------------

-- ----------------------------
-- Table structure for `admin_roles`
-- ----------------------------
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `id` bigint(20) NOT NULL auto_increment,
  `pid` bigint(20) default '1' COMMENT '父级id',
  `title` varchar(64) NOT NULL COMMENT '角色类型名称',
  `descn` varchar(128) default NULL COMMENT '描述',
  `is_valid` tinyint(1) default '1' COMMENT '是否可以',
  `is_delete` tinyint(1) default '0' COMMENT '是否删除默认为0',
  `status` bigint(20) default '1' COMMENT '状态默认为1',
  `sort` bigint(20) default '1' COMMENT '排序默认为1',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '更新时间戳 自动',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_roles
-- ----------------------------
INSERT INTO `admin_roles` VALUES ('1', '1', '超级管理员', '超级管理员', '1', '0', '1', '1', null, '2018-01-13 15:58:35', '2018-01-13 07:58:34');

-- ----------------------------
-- Table structure for `admin_role_type`
-- ----------------------------
DROP TABLE IF EXISTS `admin_role_type`;
CREATE TABLE `admin_role_type` (
  `id` bigint(20) NOT NULL auto_increment,
  `pid` bigint(20) default '0' COMMENT '父级id',
  `title` varchar(64) NOT NULL COMMENT '角色类型名称',
  `descn` varchar(128) default NULL COMMENT '描述',
  `is_valid` tinyint(1) default '1' COMMENT '是否可以',
  `is_delete` tinyint(1) default '0' COMMENT '是否删除默认为0',
  `status` bigint(20) default '1' COMMENT '状态默认为1',
  `sort` bigint(20) default '1' COMMENT '排序默认为1',
  `create_time` datetime default NULL COMMENT '创建时间',
  `modify_time` datetime default NULL COMMENT '修改时间',
  `update_time` timestamp NULL default NULL on update CURRENT_TIMESTAMP COMMENT '更新时间戳 自动',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_role_type
-- ----------------------------
INSERT INTO `admin_role_type` VALUES ('1', '0', '系统角色', '系统角色', '1', '0', '1', '1', null, null, '2018-01-24 09:54:04');
