import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        // Observação: caso não tenha nada no sessionStorage, que é
        // o caso deste exemplo, o valor null será o default:
        const auth = JSON.parse(sessionStorage.getItem('auth')) || null;
        if(auth && auth.token && auth.xPessoa) {
            console.log('AuthorizationInterceptor', auth.token);
    
            // Clona a requisição porque não podemos alterar
            // a instância do HttpHeaders, ela é imutável
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + auth.token).set('x-pessoa', auth.xPessoa)
            });
    
            // Devolvemos a nova requisição com o header Authorization:
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}