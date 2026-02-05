import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CustomJwtPayload } from '../models/Auxiliars';
import { LoginDto } from '../Dto/LoginDto';
import { Observable } from 'rxjs';
import { URL_BASE } from '../environments/globals';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

    token: string | null;

    // Injectamos nuestro http
    constructor(
        private _http: HttpClient = inject(HttpClient)
    ){}

    // Método que recoge el token de la web.
    public getToken(): string | null{
        return localStorage.getItem('token');
    }

    public getRefreshToken(): string | null{
        return localStorage.getItem('refresh-token');
    }

    public refreshToken(): Observable<any> {
        let token = this.getRefreshToken();
        return this._http.post<Observable<string>>(`${URL_BASE}regenerarToken`, token);
    }

    // Método que borra el token de la web.
    private removeTokenFromLocalStorage(): void{
        localStorage.removeItem('token');
        localStorage.removeItem('refresh-token');
    }

    // Método que almacena el token en el localstorage
    public setTokenLocalStorage(token: string, refreshToken: string): void{
        localStorage.setItem("token", token);
        localStorage.setItem("refresh-token", refreshToken);
    }

    // Método que realiza el login en la web.
    public login(request: LoginDto): Observable<any>{
        this.logout();
        return this._http.post<Observable<string>>(`${URL_BASE}authenticate`, request);
    }

    // Método que realiza el logout en la web.
    public logout(): void{
        this.removeTokenFromLocalStorage();
    }

    // Método que recibe el token y devuelve el usuario del payload.
    public getUsernameFromPayload(): string{

        let decoded: CustomJwtPayload;
        this.token = this.getToken();

        if (this.token){
            try{
                decoded = jwtDecode(this.token);
                return decoded.sub!;
            }catch(error){
                return "Desconocido";
            }
        }

        return "El usuario no está logueado";
    }

    // Método que recibe el token y devuelve el usuario del payload.
    public getRolFromPayload(): string{

        let decoded: CustomJwtPayload;
        let rol: string;
        this.token = this.getToken();

        if (this.token){
            decoded = jwtDecode(this.token);
            rol = decoded.ROL[0]?.authority;

            switch(rol){
                case "ROLE_USER": rol = "usuario"; break
                case "ROLE_ADMIN": rol = "admin"; break
                case "ROLE_SUPER_ADMIN": rol = "super-admin"; break
            }

            return rol;
        }

        return "El usuario no está logueado";
    }

    public getIdFromPayload(): number{

        let decoded: CustomJwtPayload;
        let id: number;
        this.token = this.getToken();

        if(this.token){
            decoded = jwtDecode(this.token);
            id = decoded.id;

            return id;
        }

        return 0;
    }

    public getDateToken(): number {

        let decoded: CustomJwtPayload;
        this.token = this.getToken();

        if(!this.token){
            return 0;
        }

        decoded = jwtDecode(this.token);
        if (!decoded.exp){
            return 0;
        }

        return decoded.exp;
    }

    // Método que comprueba si está logueado el usuario
    public checkState(): boolean{

        let decoded: CustomJwtPayload;
        this.token = this.getToken();
        let currentTime = Math.floor(Date.now() / 1000);

        // Intentamos recuperar el token y comprobamos que exista en el localStorage.
        if (!this.getToken){
            return false;
        }

        // Intentamos obtener el token.
        if (!this.token){
            this.logout;
            return false;
        }

        // Obtenemos el payload del token.
        try{
            decoded = jwtDecode(this.token);
        }catch(error){
            this.logout;
            return false;
        }

        // Comprobamos que el payload esté en la variable donde lo hemos almacenado.
        if (!decoded){
            this.logout;
            return false;
        }

        // Comprobamos que el token cumpla con el tiempo de validez.
        if (decoded.exp && decoded.exp > currentTime){
            return true;
        }else {
            this.logout;
            return false;
        }
    }

}
