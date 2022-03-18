const imagePickBtn = document.getElementById('image');
const imgPreview = document.querySelector('#image-upload-control img ');


imagePickBtn.addEventListener('change', imagePreview)


function imagePreview() {
    const files = imagePickBtn.files //it's like value, with text type inputs. it's an array of files

    if(!files || files.length === 0){
        imgPreview.style.display = 'none';
        return;
    };

    const pickedFile = files[0];
    imgPreview.src = URL.createObjectURL(pickedFile) //createObjectURL returns url with hash, and store object in memory until document triggers unload event (e.g. document close). it will create picked file url
    
    imgPreview.style.display = 'block';
    
}