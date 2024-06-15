const editProject = async() =>{
    const userDoc = doc(firebase.db,"projects",formid.id)
    const updatedDoc = {
     pname:pname,
     cname:cname,
     startdate:stringstartdate,
     enddate:stringenddate
      }
      await updateDoc(userDoc,updatedDoc)
      getUsers()
      handleClose();
      Swal.fire("updated","Your file has been updated","success")
   }