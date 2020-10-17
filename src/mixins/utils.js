const utils = {

    methods:{
         /**Generator password ramdon*/
    $password_generator(){
        let caracteres = "-abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ23467890@{}+";
        let password = "";
        for (let i=0; i<8; i++) password += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
        return password;
    },

    /**Alerts */
    $showAlertConfirm(title, text) {
    return new Promise((resolve, reject) => {
        this.Swal.fire({
          title,
          text,
          type: 'info',
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          showCancelButton: true,
          cancelButtonColor: 'red'
        })
          .then(result => {
            // eslint-disable-next-line no-prototype-builtins
            if (result.hasOwnProperty('value')) {
              resolve(true)
            } else {
              resolve(false)
            }
            // eslint-disable-next-line prefer-promise-reject-errors
          })
          .catch(err => reject({ error: err }))
      })
    },
    $showInfoSuccessNotify(type = 'success' ,title = 'Successful operation') {
        const Toast = this.Swal.mixin({
          toast: true,
          position: 'top',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          type: 'success'
        })
  
        Toast.fire({
          type: type ,
          title: title
        })
      },
    }

   

}

export default utils
