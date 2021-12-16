// 每次调用$.get()或$.post()或$.ajax()的时候就会调用这个函数，在这个函数中可以拿到我们给ajax的配置对象
$.ajaxPrefilter(function (options) {
    // 发起ajax之前拼接上根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // 为有权限的接口设置请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    };
    // 全局统一挂载这个登录验证函数
    options.complete = function (res) {
        console.log(res);
        // 当获取用户数据失败时强制回到登录界面
        // 在complete回调函数中可以使用res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1.强制清空token
            localStorage.removeItem('token');
            // 2.强制跳转回登录页面
            location.href = '/login.html';
        }
    }
});