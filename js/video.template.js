const templateVideo =`
<section class="video">
          <h2>Видео</h2>
          <div class="video-wrap">
              <div class="modal fade" id="modal6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content">
                    <div class="modal-body mb-0 p-0">
                      <div class="embed-responsive embed-responsive-16by9 z-depth-1-half">
                        <iframe id="video-iframe" class="embed-responsive-item" src=""
                          allowfullscreen></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <a><img id="video-img" src="" alt="video"
                  data-toggle="modal" data-target="#modal6"></a>
          </div>
</section>
`;