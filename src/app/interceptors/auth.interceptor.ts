import {
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';

export class AuthInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const auth = JSON.parse(sessionStorage.getItem('auth')) || null;
        if(auth && auth.token && auth.xPessoa) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + auth.token).set('x-pessoa', auth.xPessoa)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }
}