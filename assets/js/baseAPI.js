// 每次调用$.get或$.post或$.ajax的时候就会调用这个函数，在这个函数中可以拿到我们给ajax的配置对象
$.ajaxPrefilter(function (options) {
    // 发起ajax之前拼接上根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    console.log(options);
});