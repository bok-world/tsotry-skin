$(function(){
  var pathname = $(location).attr('pathname'),
    parts = pathname.split('/'),
		checkedPages = parts.length;
  var hasContent = $('.wrap_detail_content #content_permallink_article').length;
	console.log('pathname  ' + pathname);
	console.log('parts.length   ' + parts.length);


	 if (parts[1] !== '') {
     /* 컨텐츠 출력 영역에 의한 레이아웃 조정 - 페이지 내용이 전체에 표현 되도록 처리 */
    //  $('.contentsWrap').addClass('hidden');
		//  $('.subPageWrap').removeClass('hidden');
   }else{
		//  $('.contentsWrap').removeClass('hidden');
    //  $('.subPageWrap').addClass('hidden');
	 }

  /* 내용 출력이 있는 경우 처리 */
  if ($('.wrap_detail_content #content_permallink_article').length != false) {
    // 제목 관련 보정
    $('.box_fix_header .txt_fix_tit').text($('#content_permallink_article .txt_sub_tit').text());

    var seoImage = $('meta[property="og:image"]').attr('content');
    if (seoImage != false) {
      $('#content_permallink_article .article_cont').prepend(
        '<p class="article_img img_type1"><span class="imageblock"><img src="' + seoImage + '" alt=""></span></p>'
      );
    }
    // 댓글 수 보정
    $('.box_fix_header .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
    $('#content_permallink_article .article_util .util_comment .txt_count').text(
      $('.btn_info_comment .txt_style').text()
    );
    $('.btn_info_comment .txt_style').bind('DOMSubtreeModified', function () {
      $('.box_fix_header .util_comment .txt_count').text($('.btn_info_comment .txt_style').text());
      $('#content_permallink_article .article_util .util_comment .txt_count').text(
        $('.btn_info_comment .txt_style').text()
      );
    });

    // 댓글 아이콘 클릭 이벤트 처리
    $('#content_permallink_article .article_util .util_comment').click(function (e) {
      e.preventDefault();
      $('#content_permallink_article .comment_info .btn_info_write').trigger('click');
    });
    $('.box_fix_header .util_comment').click(function (e) {
      e.preventDefault();
      $('#content_permallink_article .comment_info .btn_info_write').trigger('click');
    });

    // 공유하기 아이콘 클릭 이벤트 처리
    $(document).on('click', '.box_fix_header .util_share', function (e) {
      e.preventDefault();
      $('.postbtn_like .btn_share').trigger('click');
    });
    $(document).on('click', '#content_permallink_article .article_util .util_share', function (e) {
      e.preventDefault();
      $('.postbtn_like .btn_share').trigger('click');
    });

    // 공감 아이콘 클릭 이벤트 처리
    if ($('.postbtn_like .uoc-icon').length != false) {
      // 헤데의 공감 아이콘 클릭 시 처리
      $('.box_fix_header .util_like').click(function (e) {
        e.preventDefault();
        $('.postbtn_like .uoc-icon').trigger('click');
      });
      // 컨텐츠 하단의 공감 아이콘 클릭 시 처리
      $('#content_permallink_article .article_util .util_like').click(function (e) {
        e.preventDefault();
        $('.postbtn_like .uoc-icon').trigger('click');
      });

      // 공감 수 변경 시 처리
      $('.postbtn_like .uoc-icon .uoc-count').bind('DOMSubtreeModified', function () {
        $('.box_fix_header .util_like .txt_count').text($('.postbtn_like .uoc-icon .uoc-count').text());
        $('#content_permallink_article .article_util .util_like .txt_count').text(
          $('.postbtn_like .uoc-icon .uoc-count').text()
        );
      });
    } else {
      // 공감 기능이 지원되지 않는 콘텐츠에 대한 처리
      $('.box_fix_header .util_like').hide();
      $('#content_permallink_article .article_util .util_like').hide();
    }
  }

})


function displayControl() {
  var $location = $(location),
    pathname = $location.attr('pathname'),
    href = $location.attr('href'),
    parts = pathname.split('/');

  $('.btn_search_del').click(function () {
    $('.inp_search').val('');
  });

  if ($('.category_search_list').length != false) {
    $('.category_index_list').hide();

    $('.category_search_list .item_category').each(function (i) {
      var href = $(this).find('.link_category').attr('href'),
        $category_index_item = $('.category_index_list').find('[href="' + href + '"]'),
        thumbnail_full_path = $category_index_item.find('.item-thumbnail').css('background-image'),
        thumbnail_path = window.TistoryBlog.url + pathname;
      if (thumbnail_full_path != undefined) {
        thumbnail_path = thumbnail_full_path.replace(/^url\(['"](.+)['"]\)/, '$1');
      }
      if (thumbnail_path) {
        $(this)
          .find('.link_category')
          .data('thumbnail', thumbnail_path)
          .css({
            'background-image': 'url(' + thumbnail_path + ')',
          });
        $(this)
          .find('.item-thumbnail')
          .data('thumbnail', thumbnail_path)
          .css({
            'background-image': 'url(' + thumbnail_path + ')',
          });
      } else {
        $(this).find('.item-thumbnail').addClass('no_img');
      }

      $(this).find('.summary').text($category_index_item.find('.summary').text());
    });
  }

  $('.item-thumbnail').each(function (i) {
    var $o = $(this),
      thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
      base_path = window.TistoryBlog.url + pathname;

    if (thumbnail_path == base_path || thumbnail_path == href) {
      $o.addClass('no-img');
    }
  });
  $('.category_search_list .item_category').each(function (i) {
    var $o = $(this),
      thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
      base_path = window.TistoryBlog.url + pathname;
    if (thumbnail_path == base_path) {
      $o.addClass('no-img');
    }
  });
  $('.category_search_list .link_category').each(function (i) {
    var $o = $(this),
      thumbnail_path = $o.css('background-image').replace(/^url\(['"](.+)['"]\)/, '$1'),
      base_path = window.TistoryBlog.url + pathname;
    if (thumbnail_path == base_path) {
      $o.addClass('no-img');
    }
  });

  if ($('.area-view').length != false) {
    $('.area-view .article-header').each(function () {
      var thumbnail = $(this).attr('thumbnail');

      if (thumbnail !== undefined && thumbnail) {
        $(this).css('background-image', 'url(' + thumbnail + ')');
      } else if (!$(this).hasClass('article-header-protected')) {
        $(this).addClass('article-header-noimg');
      }
    });

    if ($('.area-align > .area-slogun:first-child').length) {
      $('.header').addClass('border-none');
    }
    if ($('.area-view > .article-type-common:first-child').length) {
      $('.main').addClass('notice-margin');
    }
    if ($('#tt-body-archive').length > 0 || $('#tt-body-tag').length > 0) {
      $('.main').addClass('notice-margin');
    }
  }

  if (window.T.config.USER.name) {
    $('.btn-for-user').show();
    $('.btn-for-guest').hide();
  } else {
    $('.btn-for-user').hide();
    $('.btn-for-guest').show();
  }

  $('.btn-for-guest [data-action="login"]').click(function () {
    document.location.href =
      'https://www.tistory.com/auth/login?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
  });
  $('.btn-for-user [data-action="logout"]').click(function () {
    document.location.href =
      'https://www.tistory.com/auth/logout?redirectUrl=' + encodeURIComponent(window.TistoryBlog.url);
  });

  $('.area-cover').each(function () {
    $container = $(this);
    if ($container.find('.box-article .article-type-crop, .box-article .article-type-resize').length >= 3) {
      $container.children('.button-more').show();
    }
  });

  $('.area-cover .button-more').bind('click', function () {
    var $btn = $(this),
      $container = $btn.closest('.area-cover');
    $container.find('article:hidden').each(function (i) {
      $(this).slideDown();
    });

    // check, has hidden item
    if ($container.children('article:hidden').length == 0) {
      $btn.hide();
    }
  });

  var $container = $('.area-main');
  var $pageMore = $container.find('.paging-more');

  var currentPage = 1;
  var nextPage = null;
  var $currentLink = $('.area-paging:last .link_num .selected');
  var $nextLink = $currentLink.parent().next('.link_num');
  if ($currentLink.length) {
    currentPage = Number($currentLink.text());
  }
  if ($nextLink.length) {
    nextPage = Number($nextLink.text());
  } else {
    nextPage = null;
  }

  if (nextPage) {
    $pageMore.on('click', function (e) {
      e.preventDefault();

      if (!$(this).hasClass('paging-more-loading')) {
        $(this).addClass('paging-more-loading');
        loadList();
      }
    });
  } else {
    dropMore();
  }

  function dropMore() {
    $pageMore.parent().addClass('area-paging-more-end');
    $pageMore.remove();
  }

  function loadList() {
    var nextUrl = $nextLink.attr('href');
    $.ajax(nextUrl, {
      success: function (result) {
        $pageMore.removeClass('paging-more-loading');
        var $list = $(result).find('.area-main');

        if (!$list.length) {
          dropMore();
          return;
        }

        $currentLink = $list.find('.area-paging:last .link_num .selected');
        $nextLink = $currentLink.parent().next('.link_num');

        if ($nextLink.length) {
          nextPage = Number($nextLink.text());
        } else {
          dropMore();
        }

        $list.find('article').each(function () {
          $container.find('article:last').after(this);
        });

        setThumbnail();
      },
    });
  }

  if ($('.area-common .article-type-thumbnail, .area-view .article-type-thumbnail').length) {
    $('.title-search').addClass('title-border');
  }
}

(function ($) {
  $(document).ready(function () {
    displayControl();
  });
})(tjQuery);



//페이지 맨 위로 보내기
function goPageTop(){
	$("html, body").stop().animate({scrollTop:0}, 1200, 'easeOutQuint');
}