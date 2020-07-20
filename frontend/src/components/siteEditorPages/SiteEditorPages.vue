<template>
    <div class="site-editor-pages">
        <PageTitle icon="fa fa-pencil-square-o" main="Site Editor" />
        <div class="site-editor-pages">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Home" active>
                          <HomeContent />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import HomeContent from './HomeContent'

export default {
    name: 'SiteEditor',
    components: { PageTitle, HomeContent }
}
</script>

<style>

</style>