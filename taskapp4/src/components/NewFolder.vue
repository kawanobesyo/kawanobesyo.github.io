<template>
  <div id="NewFile">
    <!-- ログイン時にはフォームとログアウトボタンを表示 -->
    <div v-if="user.uid" key="logina">
      <button @click="logOut" class="btn btn-primary">ログアウト</button>
      <p>{{user.email}}</p>
    </div>
    <!-- 未ログイン時にはログインボタンを表示 -->
    <div v-else key="logouta">
      <button @click="logIn" class="btn btn-primary">ログイン</button>
    </div>
    <div class="posts_inner" v-if="user.uid" key="login">
    <h1 id="header">在庫管理表</h1>
    <div id="btn">
      <button @click="opneModal">＋</button>
    </div>
      <ul id="list">
        <li v-for="(folder, index) in folders" :key="folder.id">
          <p>{{folder.index}}</p>
          <router-link to="/test">{{ folder.name }}</router-link><button @click="deletefolder(index)">削除</button>
        </li>
      </ul>
    </div>
    <div v-else key="logout" class="notLogin">ログインしてください。</div>
    <button @click="tests">一覧表示</button>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
export default {
  name: 'newfile',
  data() {
    return {
      folders:[],
      user: {}
    }
    },
      created() {
    firebase.auth().onAuthStateChanged(user =>{
      this.user = user ? user : {}
    })
  },
  updated() {
    let values
      firebase.database().ref('folder').on('value', function(snapshot) {
        values = snapshot.val()
      })
      console.log(values)
  },
    methods: {
      tests() {
        let values
        firebase.database().ref('folder').on('value', function(snapshot) {
          values = snapshot.val()
        })
        this.folders = values
        console.log(values)
      },
      logIn() {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(obj => {
          console.log('Create account: ' + obj.user.email)
        })
        .catch(error =>{
          alert(error.message)
        })
    },
    logOut() {
      firebase.auth().signOut()
    },
      opneModal() {
        const that = this
        this.$swal({
          icon: 'info',
          text: '新規作成するフォルダ名を入力してください。',
          content:'input',
          buttons: true,
        })
        .then((folders) => {
          if(folders) {
            this.$swal({
              icon: 'success',
              text: `新規フォルダ${folders}を作成しました。`,
            })
            this.folders.push({ name: folders})
            firebase.database().ref('folder').update(
              that.folders
            )
            // this.newFolderName = '' 
          }else {
            this.$swal({
              icon: 'error',
              text: 'キャンセルしました。'
            })
          }
        })
      },
      deletefolder(index) {
        console.log(index)
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
            a.folders.splice(index, 1)
            this.$swal("削除しました。", {
              icon: "success",
            });
            firebase.database().ref('folder').child(index).remove()
          }else {
            this.$swal("キャンセルしました。");
          }
        });
        
      }
    }
  }


</script>

<style scope>

#app{
  width: 100%;
  height: 100vh;
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
  
