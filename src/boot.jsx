// import './index.css';

// import 'font-awesome/css/font-awesome.css';
import 'font-awesome/scss/font-awesome.scss';
// import 'font-awesome/less/font-awesome.less';

// import 'open-sans/open-sans.css';
import 'open-sans/open-sans.scss';
// import 'open-sans/open-sans.less';

// import 'bootstrap/dist/css/bootstrap.css';
import './bootstrap/bootstrap.scss';
import './bootstrap/bootstrap';

// initialize bootstrap tooltips
$(() => {
  $.fn.tooltip.Constructor.Default.placement = 'bottom';
  $('[data-toggle="tooltip"]').tooltip();
});
