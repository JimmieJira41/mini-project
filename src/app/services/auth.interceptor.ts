import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const Token = localStorage.getItem('token');
        if(Token){
            console.log(Token);
              const cloned = req.clone({
                  headers: req.headers.set("Authorization","Bearer "+Token)
              });  
            return next.handle(cloned);

        }else{
            return next.handle(req);
        }
    }
}