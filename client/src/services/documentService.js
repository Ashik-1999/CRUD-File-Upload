import axios from 'axios';

class Post {

    create(formData) {
        console.log(formData,'dgfg')
        const url = "http://localhost:4000/api/post";
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, formData, config);
    }

    getPost() {
        const url = 'http://localhost:4000/api/post';
        return axios.get(url);
    }

    deletePost(id) {
        console.log(id)
        const url = `http://localhost:4000/api/post/${id}`;
        return axios.delete(url);
    }

    getPostForEdit (id){
        const url =  `http://localhost:4000/api/post/update-post/${id}`;
        return axios.get(url);
    }

    editImage(image,id){
        const url =  `http://localhost:4000/api/post/update-image/${id}`;
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        return axios.post(url, image, config);
        
    }

    editData(datas,id){
        
        const url =  `http://localhost:4000/api/post/update-details/${id}`;
        return axios.post(url, datas);
    }

    userSignUp(values){
        
        const url =  `http://localhost:4000/api/post/register`;
        return axios.post(url, values);
    }

    userLogin(values){
       
        const url =  `http://localhost:4000/api/post/login`;
        return axios.post(url, values);
    }

}

export default new Post();