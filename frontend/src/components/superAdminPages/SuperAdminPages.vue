<template>
    <div class="super-admin-pages">
        <PageTitle icon="fa fa-cogs" main="System Administration" />
        <div class="super-admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Account Management" active>
                        <AccountManagement />
                    </b-tab>
                    <b-tab title="Create New Account">
                        <CreateAccount />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import AccountManagement from './AccountManagement'
import CreateAccount from './CreateAccount'

export default {
    name: 'SuperAdminPages',
    components: { PageTitle, CreateAccount, AccountManagement }
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