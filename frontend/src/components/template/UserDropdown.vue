<template>
    <div href class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{user.name}}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email"/>
            </div>

            <i class="fa fa-angle-down" alt="user"></i>
        </div>
        <div class="user-dropdown-content">
            <a href><i class="fa fa-cogs"></i>Administration</a>
            <a href><i class="fa fa-sign-out"></i>Sign out</a>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: "UserToolbar",
    components: { Gravatar },
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown{
        height: 100%;
    }

    .user-dropdown-img{
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
    }

    .user-dropdown-img > img{
        max-height: 27px;
        border-radius: 5px;
        padding: 1px 0px;
    }

    .user-dropdown-content{
        right: 0px;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: 5px 10px;
        background-color: #fff;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.198);

        opacity: 0;
        visibility: hidden;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown-content > a{
        padding: 5px 5px 5px 5px;
        font-size: 0.8em;
        color: #000;
        text-decoration: none;
    }

    .user-dropdown-content > a:hover{
        background-color: rgb(209, 209, 209);
        color: #000;
        text-decoration: none;
    }

    .user-dropdown-content > a > i{
        padding-right: 5px;
    }

    .user-dropdown-menu > a{
        padding-right: 0px;
    }

    .user-dropdown:hover{
        background-color: #16234669;
    }

    .user-dropdown:hover .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }

    .user-button{
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 100%;
        color: #fff;
        padding: 0px 10px;
    }

    .user-button *{
        padding: 0px 4px;
    }
</style>