<template>
  <template v-if="user">
    <van-cell title="当前用户" :value="user?.userAccount"/>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/user/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/user/team/join"/>
    <van-cell title="退出" @click="logout"/>
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";
import {getCurrentUser} from "../services/user";
import {setCurrentUserState} from "../states/user";

// const user = {
//   id: 1,
//   username: 'taim',
//   userAccount: 'taimacc',
//   avatarUrl: 'https://636f-codenav-8grj8px727565176-1256524210.tcb.qcloud.la/img/logo.png',
//   gender: '男',
//   phone: '123112312',
//   email: '12345@qq.com',
//   planetCode: '1234',
//   createTime: new Date(),
// }

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}

const logout = async () => {
  const res = await myAxios.post('/user/logout');
  if (res.data == 1) {
    Toast.success('退出成功');
    setCurrentUserState(null);
    user.value = await getCurrentUser();
  } else Toast.fail('退出失败')
}
</script>

<style scoped>

</style>
