import {
    HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {tap} from "rxjs/operators"

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("request is on its way");
    console.log(req.url);
    const modReq = req.clone({ headers: req.headers.append("Auth", "xyz") });
    return next.handle(modReq);
  }
}
