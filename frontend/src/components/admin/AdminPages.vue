<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" title="System Administration" subtitle="Registers and etc"/>

        <div class="admin-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Articles" active >
                        <AdminArticle/>
                    </b-tab>

                    <b-tab title="Categories">
                        <AdminCategorie/>
                    </b-tab>

                    <b-tab title="Users">
                        <AdminUser/>
                    </b-tab> 
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import AdminArticle from './AdminArticle'
import AdminCategorie from './AdminCategorie'
import AdminUser from './AdminUser'

export default {
    name: "AdminPages",
    components: { PageTitle, AdminArticle, AdminCategorie, AdminUser}
}
</script>

<style>

</style>