import { ICat } from '../models/ICat';

export abstract class CatService {
    // public static RequestHeader = 
    public static GetRequestHeaderOptions = {
        headers: { 'x-api-key': '92524e02-c5a4-403b-b025-34952492ae0a' }
    };
    public static PostRequestHeaderOptions: any = {
        method: 'POST',
        headers: { 'x-api-key': '92524e02-c5a4-403b-b025-34952492ae0a' },
        body: {}

    };
    public static GetUniqueImageNumber(): string {
        let tmpdate = new Date().getTime();
        return `IMAGE-${tmpdate}`;
    }
    public static GetAllCats = (): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                fetch(`https://api.thecatapi.com/v1/images`, CatService.GetRequestHeaderOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Fetched Data', data);
                        resolve(data);
                    });
            }
            catch (exception) {
                resolve(null);
            }
        });
    }

    public static UploadFile = (file: File): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                const data = new FormData();
                data.append('file', file);
                data.append('sub_id', CatService.GetUniqueImageNumber());
                CatService.PostRequestHeaderOptions.body = data;
                console.log('Post Request Body', CatService.PostRequestHeaderOptions);
                fetch(`https://api.thecatapi.com/v1/images/upload`, CatService.PostRequestHeaderOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Uploaded Image', data);
                        resolve(data);
                    });
            }
            catch (exception) {
                console.log("Error:", exception);
                resolve(null);
            }
        });
    }


    public static SetFavourite = (cat: ICat): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                const data = new FormData();
                data.append('image_id', `${cat.id}`);
                CatService.PostRequestHeaderOptions.body = data;
                console.log('Post Request Body', CatService.PostRequestHeaderOptions);
                fetch(`https://api.thecatapi.com/v1/favourites`, CatService.PostRequestHeaderOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Set Favourite', data);
                        resolve(data);
                    });
            }
            catch (exception) {
                console.log("Error:", exception);
                resolve(null);
            }
        });
    }
    public static SetVoteUpDown = (cat: ICat): Promise<any> => {
        return new Promise<any>((resolve, reject) => {
            try {
                const data = new FormData();
                data.append('image_id', `${cat.id}`);
                if (cat.isVoteUp) {
                    data.append('value', '1');
                } else {
                    data.append('value', '0');
                }

                CatService.PostRequestHeaderOptions.body = data;
                console.log('Post Request Body', CatService.PostRequestHeaderOptions);
                fetch(`https://api.thecatapi.com/v1/votes`, CatService.PostRequestHeaderOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log('Set votes', data);
                        resolve(data);
                    });
            }
            catch (exception) {
                console.log("Error:", exception);
                resolve(null);
            }
        });
    }
}