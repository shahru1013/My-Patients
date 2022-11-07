import React, { useEffect } from 'react';
import './style.css';
import $ from 'jquery';
import Mustache from 'mustache';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Prescription() {


  useEffect(()=>{
    // const script = document.createElement('script');
    // script.src = "https://code.jquery.com/ui/1.12.1/jquery-ui.js";
    // script.async = true;
    // document.body.appendChild(script);
     
//     <script src="/tdk/scripts/jquery.min.js" type="text/javascript"></script>
// <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
// <script src="/tdk/scripts/bootstrap.js" type="text/javascript"></script>
// <script src="/tdk/scripts/jquery.dataTables.js" type="text/javascript"></script>
// <script src="/tdk/scripts/dataTables.bootstrap.js" type="text/javascript"></script>



    $(document).ready(function() {
      Date.prototype.calcDate = function(days) {
        let date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return `(Untill ${date.getUTCDate()}-${date.getUTCMonth() +
          1}-${date.getUTCFullYear()})`;
      };
      let timeout;
      function snackSaving() {
        let snack = document.getElementById("snacking");
        snack.className = "show";
        timeout = setTimeout(() => {
          alert('ERR: Conection timeout.')
        }, 8000);
      }
      function snackSaved() {
        clearTimeout(timeout);
        let snack = document.getElementById("snacking");
        snack.className = snack.className.replace("show", "");
        let snacked = document.getElementById("snacked");
        snacked.className = "show";
        setTimeout(function() {
          snacked.className = snacked.className.replace("show", "");
        }, 1500);
      }
      // $("[data-toggle=tooltip]").tooltip("show");
      // setTimeout(function() {
      //   $("[data-toggle=tooltip]").tooltip("hide");
      // }, 5000); //hide tooltips after 5sec
      // $(document).keyup(function() {
      //   $("[data-toggle=tooltip]").tooltip("hide");
      // }); //hide tooltip while typing
      $(document).on("focusin keypress", ".med_name", function(e) {
        let x = $(this).siblings("div.med_name_action");
        if (e.type == "focusin") {
          x.css("display", "block");
        }
        if (e.type == "keypress") {
          if (e.keyCode == 13) x.children("button.save").click();
        }
      });
    
      $(document).on("click", ".cancel-btn", function() {
        $(this)
          .parent()
          .css("display", "none"); //hides save/cancel btn
      });
      $(document).on("click", ".med_name_action button.save", function() {
        $(this)
          .parent()
          .css("display", "none");
        $(".sc_time").removeClass("folded");
      });
      $(".med_name").keypress(function(e) {
        if (e.which == 13) {
          $("#symp_save").click();
        }
      });
    
      $(document).on("mousedown", ".sc", function(e) {
        let x = $(this).siblings("div.med_when_action");
        x.css("display", "block");
      });
      $(document).on("click", ".med_when_action button.save", function() {
        $(this)
          .parent()
          .css("display", "none");
        $(".select").removeClass("folded");
      });
      $("select.sc").change(function() {
        let x = $(this).siblings("div.med_when_action");
        x.css("display", "none");
      });
    
      $(document).on("mousedown", ".meal", function() {
        let x = $(this).siblings("div.med_meal_action");
        x.css("display", "block");
      });
      $(document).on("click", ".med_meal_action button.save", function() {
        $(this)
          .parent()
          .css("display", "none");
        $(".period").removeClass("folded");
      });
    
      $(document).on("focusin keypress", ".med_period", function(e) {
        let x = $(this).siblings("div.med_period_action");
        if (e.type == "focusin") {
          x.css("display", "block");
        }
        if (e.type == "keypress") {
          if (e.keyCode == 13) x.children("button.save").click();
        }
      });
      $(document).on("click", ".med_period_action button.save", function() {
        $(this)
          .parent()
          .css("display", "none");
      });
      $(document).on("keyup", ".med_period", function() {
        let period = $(this).val();
        console.log('period --- ', period);
        let num =  period.match(/\d+/g)[0];
        let type = period.match(/\b(\w)/g)[1];
        let days = null;
        if (type == "d") days = num;
        else if (type == "w") days = num * 7;
        else if (type == "m") days = num * 30;
        else if (type == "y") days = num * 365;
        let span = $(this).siblings("span.date");
        if (days) {
          let date = new Date().calcDate(days);
          span.html(date);
        } else {
          span.html("(Invalid time period)");
        }
      });
    
      $(".sc").keyup(function(e) {
        if (isNaN(e.key)) return;
        let el = $(this);
        el = el
          .val()
          .split("-")
          .join("");
        let finalVal = el.match(/.{1,1}/g).join("-");
        $(this).val(finalVal);
      });
      function initLi(e) {
        let txt = e.target.innerHTML;
        if (!txt.includes("<li>")) {
          let el = "<li></li>";
          $(this).append(el);
        }
      }
      $(".symptoms ul").focusin(initLi);
      $(".symptoms ul").keyup(function(e) {
        let fl = $(this)
          .children()
          .first();
        let el = `<li>${e.target.textContent}</li>`;
        if (fl.text().length < 1) {
          $(this).html("");
          $(this).append(el);
        }
      });
      $("#symp_save").click(function() {
        $(".symp_action").css("display", "none");
      });
    
      $(".tests ul").focusin(initLi);
      $(".tests ul").keyup(function() {
        let fl = $(this)
          .children()
          .first();
        let el = "<li></li>";
        if (fl.text().length < 1) {
          $(this).html("");
          $(this).append(el);
        }
      });
      $("#test_save").click(function() {
        $(".test_action").css("display", "none");
      });
    
      $(".symptoms ul").focusin(function() {
        $(".symp_action").css("display", "block");
      });
    
      $(".tests ul").focusin(function() {
        $(".test_action").css("display", "block");
      });
    
      $(".advice p").focusin(function() {
        $(".adv_action").css("display", "block");
      });
    
      $("#adv_save").click(function() {
        $(".adv_action").css("display", "none");
      });
      
      $(document).on("click", ".delete", function() {
        let parent = $(this).closest(".med");
        parent.remove();
      });
      
      let med_id = 1;
      $("#add_med").click(function() {
        med_id++;
        let sourceTemplate = $("#new_medicine").html();
        Mustache.parse(sourceTemplate);
        let sourceHTML = Mustache.render(sourceTemplate, { med_id });
        let medicine = $(".med_list");
        medicine.append(sourceHTML);
      })
    });

  },[])

  const dPdf=()=>{

    html2canvas(document.querySelector(".wrapper"), {allowTaint: true,
      useCORS: true,
      logging: false,
      height: window.outerHeight + window.innerHeight,
      windowHeight: window.outerHeight + window.innerHeight, width: 3000}).then(canvas => {
      // document.body.appendChild(canvas);  // if you want see your screenshot in body.
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save("download.pdf"); 
  });

  }



  return (
    <>
    <div>

     <div>
        <div className="wrapper">
          <div className="prescription_form">
            <table className="prescription"  border={1}>
              <tbody>
                {<tr height="15%">
                  <td colSpan={2}>
                    <div className="header">
                      <div className="logo">
                        <img src="https://seeklogo.com/images/H/hospital-clinic-plus-logo-7916383C7A-seeklogo.com.png" />
                      </div>
                      <div className="credentials">
                        <h4>Dr. Abdul Kashem</h4>
                        <p>{"MBBS, FCPS (Medicine)"} </p>
                        <small>Dhaka Medical Hospital, Dahaka</small>
                        <br />
                        <small>Mobile: +8801787418344</small>
                      </div>
                    </div>
                  </td>
                </tr>}
                { <tr>
                  <td width="40%">
                    <div className="desease_details">
                      <div className="symptoms">
                        <h4 className="d-header">Symptoms</h4>
                        <ul className="symp" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                        </ul>
                        <div className="symp_action">
                          <button id="symp_save" data-prescription_id="<?php echo $presc->prescription_id; ?>" className="btn btn-sm btn-success save">Save</button>
                          <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                        </div>
                      </div>
                      <div className="tests">
                        <h4 className="d-header">Tests</h4>
                        <ul className="tst" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                        </ul>
                        <div className="test_action">
                          <button id="test_save" data-prescription_id="<?php echo $presc->prescription_id; ?>" className="btn btn-sm btn-success save">Save</button>
                          <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                        </div>
                      </div>
                      <div className="advice">
                        <h4 className="d-header">Advice</h4>
                        <p className="adv_text" style={{outline: 0}} data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable="true">
                        </p>
                        <div className="adv_action">
                          <button id="adv_save" data-prescription_id="<?php echo $presc->prescription_id; ?>" className="btn btn-sm btn-success save">Save</button>
                          <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td width="60%" valign="top">
                    <span style={{fontSize: '3em'}}>R<sub>x</sub></span>
                    <hr />
                    <div className="medicine">
                      <section className="med_list">
                      </section>
                      <div id="add_med" data-toggle="tooltip" data-placement="right" title="Click anywhere on the blank space to add more.">Click to add...</div>
                    </div>
                  </td>
                </tr>}
              </tbody>
            </table>
            <div className="button_group">
              {/* <button className="issue_prescription btn btn-success">Issue</button> */}
            </div>
            <div id="snacking">Saving...</div>
            <div id="snacked">Saved!</div>
          </div>
        </div>
        <script id="new_medicine" type="text/template">
        { <div className="med" style={{}}>
           <input className="med_name" data-med_id="{{med_id}}" data-toggle="tooltip" title="Click to edit..." placeholder="Enter medicine name" />
          <div className="med_name_action">
            <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">Save</button>
            <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
          </div>
          <div className="schedual">
            <div className="sc_time folded">
              <select className="sc" data-med_id="{{med_id}}">
                <option value="1+1+1" selected>1+1+1</option>
                <option value="1+0+1">1+0+1</option>
                <option value="0+1+1">1+1+1</option>
                <option value="1+0+0">1+1+1</option>
                <option value="0+0+1">1+1+1</option>
                <option value="1+1+1+1">1+1+1+1</option>
              </select>
              <div className="med_when_action">
                <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">✓</button>
              </div>
            </div>
            <div className="taking_time select folded">
              <select className="meal" data-med_id="{{med_id}}">
                <option value={1} selected>After Meal</option>
                <option value={2}>Before Meal</option>
                <option value={3}>Take any time</option>
              </select>
              <div className="med_meal_action">
                <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">✓</button>
              </div>
            </div>
          </div>
          <div className="med_footer">
            <div className="period folded">
              Take for <input className="med_period" type="text" data-med_id="{{med_id}}" placeholder="? days/weeks..." />
              <div className="med_period_action">
                <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">✓</button>
              </div>
              <span className="date" />
            </div>
            <div className="del_action">
              <button data-med_id="{{med_id}}" className="btn btn-sm btn-danger delete"><i className="fa fa-trash" aria-hidden="true" /></button>
            </div>
          </div>
          <hr />
        </div>
        }
        </script>
      </div>

      

    </div>

<button style={{width: '300px', height:'50px', marginLeft: 'auto', marginRight: 'auto', background: 'rgba(0,0,0,0.2)', marginTop: '500px',}} onClick={()=>dPdf()}>Save Prescription</button></>
    
  )
}
