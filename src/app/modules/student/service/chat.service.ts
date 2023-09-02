import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { messageDetails } from '../interfaces/messageDetails.interface';
import { groupType } from '../enums/groupType.enum';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private domain!: string | undefined;

    constructor(
        private _socket: Socket,
        private http: HttpClient
    ) {
        this.domain = environment.domain;
    }
    sendMessage(message: messageDetails): void {
        this._socket.emit('sendMessage', message)
    }

    getNewMessage(): Observable<any> {
        return this._socket.fromEvent<any>('newMessage')
    }

    getCommunities(studentId:string | null) {
        return this.http.get(`${this.domain}user/chat/communities/${studentId}`)
    }

    getGroup(studentId:string | null) {
        return this.http.get(`${this.domain}user/chat/groups/${studentId}`)
    }

    loadMessages(groupId:string,groupType:groupType | null){
        return this.http.get(`${this.domain}user/chat/messages/${groupId}/${groupType}`)
    }

    getFacultiesAndStudentByDepartment(studentId:string | null){
        return this.http.get(`${this.domain}user/studentAndFaculty/${studentId}`)
    }
    addGroup(groupValue:any){
        return this.http.post(`${this.domain}user/addGroup`,groupValue)
    }
}