<template>
  <div class="flex bg-gray-100 min-w-0 overflow-hidden">
    <div style="width:200px;">
      <el-menu
        :uniqueOpened="true"
        default-active="2"
        class="el-menu-vertical-demo h-screen border-none"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template #title>选项4</template>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        
      </el-menu>
    </div>
    <div class="flex-1 flex-col flex">
      <div class="bg-white w-full h-12 flex-none flex justify-end box-border">
        <div class="px-8 py-4">欢迎，小明</div>
      </div>
      <div class="box-border flex-1 px-8 pt-10 pb-12">
        <div class="h-full bg-white">
          <router-view></router-view>
        </div>
        <div class="text-center p-4 text-base text-gray-500">Copyright © 2021</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

