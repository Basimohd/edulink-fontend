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

    getNewMessage(): Observable<string> {
        return this._socket.fromEvent<string>('newMessage')
    }

    getCommunities(facultyId:string | null) {
        return this.http.get(`${this.domain}faculty/chat/communities/${facultyId}`)
    }

    loadMessages(groupId:string,groupType:groupType | null){
        return this.http.get(`${this.domain}user/chat/messages/${groupId}/${groupType}`)
    }
    getGroup(facultyId:string | null){
        return this.http.get(`${this.domain}faculty/chat/groups/${facultyId}`)
    }

    updateGroupStatus(payload: any): Observable<any> {
        return this.http.patch(`${this.domain}faculty/chat/updateGroupStatus`,payload)
    }
}