$(function () {
    // 调用这个函数获取用户基本信息
    getUserInfo();

    let layer = layui.layer;
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something

            // 1.清除本地存储的token
            localStorage.removeItem('token');
            // 2.跳转回登录页
            location.href = '/login.html';
            // 自带的的，关闭弹出层
            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers就是请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户失败');
            };
            console.log(res);
            // 调用这个函数获取用户头像
            renderAvatar(res.data);
        },
        // 不论成功还是失败最终都会调用这个函数

    })
}
// 渲染用户头像
function renderAvatar(user) {
    // 设置用户名
    let name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文字头像
        $('.layui-nav-img').hide();
        let first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}