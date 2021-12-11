import { observable, action, runInAction } from 'mobx';//, computed, reaction
import { RootStore } from './rootStore';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { IMotofy } from '../models/motofy';
import { toast } from 'react-toastify';

//THIS IS TO BE SOLVED SO THAT IT IS GENERIC AS MUCH AS POSSIBLE!!!

export default class CommentStore {
    rootStore: RootStore;
    constructor(rootStore: RootStore) {
      this.rootStore = rootStore;
    }
    @observable motofy: IMotofy | null = null;
    @observable.ref hubConnection: HubConnection | null = null;

    @action createHubConnection = (motofyId: string, connectionArgument: string, motofy: IMotofy) => {
        this.motofy = motofy;
        this.hubConnection = new HubConnectionBuilder()
          .withUrl(process.env.REACT_APP_API_CHAT_URL!, {
            accessTokenFactory: () => this.rootStore.commonStore.token!,
          })
          .configureLogging(LogLevel.Information)
          .build();
          console.log('motofy', this.motofy)
          console.log('motofy', motofy)
    
    
        this.hubConnection
          .start()
          .then(() => console.log(this.hubConnection!.state))
          .then(() => {
            console.log('Attempting to join group');
            if (this.hubConnection!.state === 'Connected') {
              this.hubConnection?.invoke('AddToGroup', motofyId);
            }
          })
          .catch((error) => console.log('Error establishing connection', error));
    
        this.hubConnection.on(connectionArgument, (comment) => {
          runInAction(() => {
            // console.log('comment', comment)
            // console.log('this.motofy!.comments', this.motofy!.commentMotofies)
            this.motofy!.commentMotofies.push(comment);
          });
        });
    
        this.hubConnection.on('Send', (message) => {
          toast.info(message);
        });
      };
    
      @action stopHubConnection = () => {
        this.hubConnection
          ?.invoke('RemoveFromGroup', this.motofy!.id)
          .then(() => {
            this.hubConnection?.stop();
          })
          .then(() => console.log('Connection stopped!'))
          .catch(error => console.log(error));
      };
    
      @action addComment = async (values: any) => {
        console.log(values);
        values.motofyId = this.motofy!.id;
        try {
          await this.hubConnection!.invoke('SendCommentMotofy', values);
        } catch (error) {
          console.log(error);
        }
      };

}