$(function () {
    // 点击去注册账号的连接
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录的连接
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    })

    //  从layui中获取form对象
    let form = layui.form;
    let layer = layui.layer;
    // 通过form.verify()来自定义校验规则
    form.verify({
        // 自定了一个叫pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一次的规则
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val();
            if (pwd !== value) {
                return '两次密码不一致';
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg('注册成功了,请登录');
            // 模拟人的点击行为，注册后切换到登录界面
            $('#link_login').click();

        })
    })

    // 监听登录表单的提交事件
    $('#form_login').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('登录失败');
                layer.msg('登录成功');
                // 将登录成功得到的token字符串保存到本地储存里面
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html';
            }
        })
    })
})