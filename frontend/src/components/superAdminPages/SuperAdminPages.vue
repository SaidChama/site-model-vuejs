<template>
    <div class="super-admin-pages">
        <PageTitle icon="fa fa-cogs" main="System Administration" />
        <div>{{ this.accManagement }}</div>
        <div class="super-admin-pages-tabs">
            <b-card no-body>
                <b-tabs card v-model="step">
                    <b-tab title="Account Management">
                        <AccountManagement />  
                    </b-tab>
                    <b-tab title="Deleted Accounts">
                        <DeletedAccounts />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import AccountManagement from './AccountManagement'
import DeletedAccounts from './DeletedAccounts'

export default {
    name: 'SuperAdminPages',
    components: { PageTitle, AccountManagement, DeletedAccounts },
    data() {
        return {
            step0: 0,
            step1: 1
        }
    }    
}
</script>

<style>
    .super-admin-pages-tabs {
        margin: 2px 3px;
    }

    .card {
        height: 100%
    }
</style>