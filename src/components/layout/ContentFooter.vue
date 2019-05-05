<template>
  <footer class="footer px-4">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-xl-6">
          <div class="copyright text-center text-xl-left text-muted">
            <router-link class="nav-link font-weight-bold ml-1" to="/">
              Model-Driven Software Development- Team 2: Reference Implementation
            </router-link>
          </div>
      </div>
      <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
              <li class="nav-item">
                  <a href="https://www.creative-tim.com" class="nav-link" target="_blank">Powered by: &copy; Creative Tim {{year}}</a>
              </li>
              <li class="nav-item">
                  <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                      class="nav-link" target="_blank">MIT License</a>
              </li>
          </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>
<style></style>
