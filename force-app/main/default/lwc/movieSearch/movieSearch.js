import { LightningElement,wire } from 'lwc';
import  {publish,MessageContext} from 'lightning/messageService';
import  MOVIE_CHANNEL from "@salesforce/messageChannel/movieChannel__c";
const Delay = 300;
export default class MovieSearch extends LightningElement {
selectedType="";
selectedSearch="";
selectedPageNo="1";
delayTimeout;
loading=false;
searchResult=[];
selectedMovie='';

@wire(MessageContext)
messageContext;

    get options() {
        return [
            { label: 'None', value: '' },
            { label: 'Moive', value: 'movie' },
            { label: 'Series', value: 'series' },
            { label: 'Episode', value: 'episode' },
        ];
    }
    handleChange(event)
    {
        let{name,value} = event.target;
        this.loading=true;
        if(name==='type'){
            this.selectedType = value;
        }
        else if(name==='search')
        {
            this.selectedSearch = value;
        }
        else if(name==='pageno')
        {
            this.selectedPageNo = value;
        }
        clearTimeout(this.delayTimeout);
      this.delayTimeout=setTimeout(()=>{
            this.searchMovie();
        },Delay);
        
    }
    async searchMovie(){
      const url=`https://www.omdbapi.com/?s=${this.selectedSearch}&type=${this.selectedType}&page=${this.selectedPageNo}&apikey=7f9b0752`;
      const res=await fetch(url);
      const data = await res.json();
     
      console.log('Movie Search:',data);
      this.loading=false;
      if(data.Response==='True'){
         this.searchResult=data.Search;
      }
    }
    get displaySearchResult(){
        return this.searchResult.length>0?true:false;
    }
    movieSelectedHandler(event)
    {
        this.selectedMovie=event.detail;
        const payload = {movieId: this.selectedMovie};
        publish(this.messageContext,MOVIE_CHANNEL,payload);
    }
}
