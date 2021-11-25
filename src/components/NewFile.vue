<template>
  <div id="NewFile">
    <router-link to="/"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
</svg></router-link>
    <h1 id="header">フォルダの名前</h1>
    <div id="btn">
      <button @click="opneModal">＋</button>
    </div>
      <ul id="list">
        <li v-for="(file, index) in files" :key="file.id">
          {{ file.name }} <button @click="deletefile(index)">削除</button>
        </li>
      </ul>
      <button @click="tests">一覧表示</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
// import firebase from '@/plugins/firebase'
export default {
  name: 'newfile',
  data() {
    return {
      dialogVisible: false,
      files:[],
      newfileName: '',
      showContent: false,
      user: {}
    }
    },
    methods: {
      tests() {
        let values
        firebase.database().ref('file').on('value', function(snapshot) {
          values = snapshot.val()
        })
        this.files = values
        console.log(values)
      },
      opneModal() {
        this.$swal({
          icon: 'info',
          text: '管理する物品を入力してください。',
          content:'input',
          buttons: true,
        })
        .then((files) => {
          if(files) {
            this.$swal({
              icon: 'success',
              text: `${files}を作成しました。`,
            })
            this.files.push({ name: files})
            this.newfileName = '' 
              firebase.database().ref('file').update(
              this.files
            )
          }else {
            this.$swal({
              icon: 'error',
              text: 'キャンセルしました。'
            })
          }
          
        })
      },
      deletefile(index) {
        const a = this
        this.$swal({
          title:"注意！",
          text: "本当に削除しますか？",
          icon:"warning",
          buttons: true,
          dangerMode: true,
        })
        .then((willDelete) => {
          if(willDelete) {
            a.files.splice(index,1)
            this.$swal("削除しました。", {
              icon: "success",
            });
            firebase.database().ref('file').child(index).remove()
          }else {
            this.$swal("キャンセルしました。");
          }
        });
        
      }
    }
  }


</script>

<style scope>

#NewFile{
  width: 100%;
  height: 100vh;
}

#NewFile svg {
  width: 40px;
  height: auto;
  fill: blue;
  margin: 5%;
}


#header {
  display: flex;
  justify-content: center;
}

#btn {
  display: flex;
  justify-content: center;
}

#list {
  justify-content: center;
  flex-wrap: wrap;
  width: 50%;
  text-align: center;
  list-style: none;
  font-size: 30px;
}

</style>
  
