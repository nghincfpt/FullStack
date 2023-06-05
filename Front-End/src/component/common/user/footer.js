import React from 'react'

export default function Footer() {
    return (
        <div>
            <footer>
                <div
                    class="footer-area section-bg"
                    style={{ background: 'black' }}
                >
                    <div class="container">
                        <div class="footer-top footer-padding">
                            <div class="row d-flex justify-content-between">
                                <div class="col-xl-3 col-lg-4 col-md-5 col-sm-8">
                                    <div class="single-footer-caption mb-50">
                                        <div class="footer-logo">
                                            <a href="index.html"
                                            ><img src="assets/img/logo/logo2_footer.png" alt=""
                                                /></a>
                                        </div>
                                        <div class="footer-tittle">
                                            <div class="footer-pera">
                                                <p class="info1">Chúng tôi luôn đồng hành cùng bạn</p>
                                            </div>
                                        </div>
                                        <div class="footer-number">
                                            <h4><span> </span>09687452365</h4>

                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                                    <div class="single-footer-caption mb-50">
                                        <div class="footer-tittle">
                                            <h4>Vị trí</h4>
                                            <ul>
                                                <li><a href="#">Quản lý</a></li>
                                                <li><a href="#">Nhân viên</a></li>
                                                <li><a href="#">Khách hàng</a></li>
                                                <li><a href="#">Lễ tân</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-2 col-lg-2 col-md-3 col-sm-5">
                                    <div class="single-footer-caption mb-50">
                                        <div class="footer-tittle">
                                            <h4>Khám Phá</h4>
                                            <ul>
                                                <li><a href="#">Tóc Mohican </a></li>
                                                <li><a href="#">Tóc Layer</a></li>
                                                <li><a href="#">Tóc Undercut</a></li>
                                                <li><a href="#">Tóc Nam Bun</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-8">
                                    <div class="single-footer-caption mb-50">
                                        <div class="footer-tittle">
                                            <h4>Đăng kí</h4>
                                            <div class="footer-pera">
                                                <p class="info1">
                                                    Đăng ký ngay để nhận thông tin cập nhật hàng ngày
                                                </p>
                                            </div>
                                        </div>
                                        <div class="footer-form">
                                            <div id="mc_embed_signup">
                                                <form
                                                    target="_blank"
                                                    action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
                                                    method="get"
                                                    class="subscribe_form relative mail_part"
                                                    novalidate="true"
                                                >
                                                    <input
                                                        type="email"
                                                        name="EMAIL"
                                                        id="newsletter-form-email"
                                                        placeholder=" Email..... "
                                                        class="placeholder hide-on-focus"
                                                        onfocus="this.placeholder = ''"
                                                        onblur="this.placeholder = 'Email.....'"
                                                    />
                                                    <div class="form-icon">
                                                        <button
                                                            type="submit"
                                                            name="submit"
                                                            id="newsletter-submit"
                                                            class="email_icon newsletter-submit button-contactForm"
                                                        >
                                                            Gửi
                                                        </button>
                                                    </div>
                                                    <div class="mt-10 info"></div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-xl-9 col-lg-8">
                                    <div class="footer-copy-right">
                                        <p>
                                            Copyright &copy;
                                            <script>
                                                document.write(new Date().getFullYear());
                                            </script>
                                            All rights reserved
                                            <i class="fa fa-heart" aria-hidden="true"></i> by
                                            <a href="https://colorlib.com" target="_blank">Colorlib</a>
                                        </p>
                                    </div>
                                </div>
                                <div class="col-xl-3 col-lg-4">
                                    <div class="footer-social f-right">
                                        <a href="#"><i class="fab fa-twitter"></i></a>
                                        <a href="https://www.facebook.com/sai4ull"
                                        ><i class="fab fa-facebook-f"></i
                                        ></a>
                                        <a href="#"><i class="fas fa-globe"></i></a>
                                        <a href="#"><i class="fab fa-instagram"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <div id="back-top">
                <a title="Go to Top" href="#"> <i class="fas fa-level-up-alt"></i></a>
            </div>
        </div>
    )
}


