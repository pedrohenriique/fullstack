<!doctype html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
</head>
<body class="hold-transition login-page">
<div class="login-box">
    <div class="login-logo">
        <b>Faça seu Login</b>
    </div>
    <div class="card card0">
        <p class="login-box-msg mt-4">
            @error('email')
            <strong style="color: red">{{ $message }}</strong>
            @enderror
        </p>
        <div class="card-body login-card-body">
            <form action="{{route('login')}}" method="post">
                @csrf
                <div class="input-group mb-3 mt-3">
                    <input type="email" class="form-control @error('email') is-invalid @enderror"
                           name="email"
                           placeholder="Email" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-envelope"></span>
                        </div>
                    </div>
                </div>
                <div class="input-group mb-3">
                    <input type="password" class="form-control @error('email') is-invalid @enderror"
                           name="password"
                           placeholder="Senha" required>
                    <div class="input-group-append">
                        <div class="input-group-text">
                            <span class="fas fa-lock"></span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary btn-block">Entrar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="{{asset('js/app.js')}}"></script>
<script src="{{asset('js/funcoes.js')}}"></script>
</body>
</html>
