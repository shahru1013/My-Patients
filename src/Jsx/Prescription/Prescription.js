import React, { useEffect, useState } from 'react';
import './style.css';
import $ from 'jquery';
import Mustache from 'mustache';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PrescriptionLogo from '../Images/prescription_logo.jpg';

export default function Prescription(props) {

  const medicines = props?.medicine || [];
  const advice = props?.advice;
  const symptoms = props?.symptoms;
  const isEditable = props?.isEditable;
  const tests = props?.tests;

  const [sympToms, setSympToms] = useState({});
  const [testsList, setTestsList] = useState({});
  const [adviceList, setAdviceList] = useState({});
  const [medicineList, setMedicineList] = useState([]);

  
 
  console.log('omaga kkk 111 ahaha', medicineList, medicines);


  useEffect(()=>{
   

   setMedicineList(medicines);

   if(isEditable){

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
    return;
  }
    let med_id = 1;
    if(!isEditable){
      console.log('eeeeeeeeeeeeeeeemmm ');
      // $('.medicine').empty();
      // $("#new_medicine").empty();
      console.log('omaga kkk 777', medicines);
      if(medicines != null){
        medicines.forEach(element => {
          med_id++;
          
          let sourceTemplate = $("#new_medicine").html();
          Mustache.parse(sourceTemplate);
          let sourceHTML = Mustache.render(sourceTemplate, { med_id });
          let medicine = $(".med_list");
          medicine.append(sourceHTML);
          console.log('ee ', element);
          console.log('ee ', $("data-med_id"));
          $(".med-"+med_id).val(element?.med_name);
          $(".med-"+med_id).prop('readonly', true);
          $(".uneditable").prop('readonly', true);
          $(".sc-"+med_id).append(element?.med_schedule);
          $(".taking-time-"+med_id).append(element?.med_taken_after == 1?'After Meal': 'Before Meal');
          $(".taking-for-"+med_id).append('Taking for '+element?.med_duration);
        });
      }

    }

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


  const collectInputsData=()=>{
    let allMedicines = [];
    for(let i=2;i<10;i++){
       if($(`.med_name-${i}`).val()){
        allMedicines.push(
          {
            med_name: $(`.med_name-${i}`).val(),
            med_schedule: $(`.med_select-${i}`).val(),
            med_taken_after: $(`.med_meal-${i}`).val(),
            med_duration: $(`.med_duration-${i}`).val()
          }
        )
       }
    }
    setMedicineList(allMedicines);

    let allsymp = [];
    $('.symp li').each(function(i)
    {
      allsymp.push($(this).text());
      setSympToms(allsymp);
    });

    let allTests = [];
    $('.tst li').each(function(i)
    {
      allTests.push($(this).text());
      setTestsList(allTests);
    });

    let allAdvices = [];
    $('.adv_text li').each(function(i)
    {
      allAdvices.push($(this).text());
      setAdviceList(allAdvices);
    });

    props.receivedValue(allMedicines, allAdvices, allTests, allsymp);
  }



  return (
    <>
    <div style={{display: 'flex', flexDirection: 'column'}}>

     <div>
        <div className="wrapper">
          <div className="prescription_form">
            <table className="prescription"  border={1}>
              <tbody>
                {<tr height="15%">
                  <td colSpan={2}>
                    <div className="header">
                      <div className="logo">
                        <img src={PrescriptionLogo} />
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
                      <div className="symptoms uneditable">
                        <h4 className="d-header">Symptoms</h4>

                        {
                          !isEditable && <div style={{marginTop: '10px'}}>
                            
                            {
                              symptoms?.map((val, id)=>{
                                return(
                                  <ul>
                                    <li>{val}</li>
                                  </ul>
                                )
                              })
                            }

                          </div>
                        }

                        <ul className="symp uneditable" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable={isEditable}>
                        </ul>
                        <div className="symp_action">
                          <button id="symp_save" data-prescription_id="<?php echo $presc->prescription_id; ?>" className="btn btn-sm btn-success save">Save</button>
                          <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                        </div>
                      </div>
                      <div className="tests">
                        <h4 className="d-header">Tests</h4>
                        {
                          !isEditable && <div style={{marginTop: '10px'}}>
                            
                            {tests?.length &&
                              tests?.map((val, id)=>{
                                return(
                                  <ul>
                                    <li>{val}</li>
                                  </ul>
                                )
                              })
                            }

                          </div>
                        }
                        <ul className="tst uneditable" data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable={isEditable}>
                        </ul>
                        <div className="test_action">
                          <button id="test_save" data-prescription_id="<?php echo $presc->prescription_id; ?>" className="btn btn-sm btn-success save">Save</button>
                          <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
                        </div>
                      </div>
                      <div className="advice symptoms uneditable">
                        <h4 className="d-header">Advice</h4>

                        {
                          !isEditable && <div style={{marginTop: '10px'}}>
                            
                            {advice?.length &&
                              advice?.map((val, id)=>{
                                return(
                                  <ul>
                                    <li>{val}</li>
                                  </ul>
                                )
                              })
                            }

                          </div>
                        }

                        <ul className="adv_text uneditable" style={{outline: 0}} data-toggle="tooltip" data-placement="bottom" title="Click to edit." contentEditable={isEditable}>
                        </ul>
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
                      {isEditable && <div id="add_med" data-toggle="tooltip" data-placement="right" title="Click anywhere on the blank space to add more.">Click this box to add medicine...</div>}
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
           <input className="med_name med-{{med_id}} med_name-{{med_id}}" data-med_id="{{med_id}}" data-toggle="tooltip" title="Click to edit..." placeholder="Enter medicine name" />
          <div className="med_name_action">
            <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">Save</button>
            <button className="btn btn-sm btn-danger cancel-btn">Cancel</button>
          </div>
          <div className="schedual">
          {!isEditable && <h5 className='sc-{{med_id}}'></h5>}
            <div className="sc_time folded">
              <select className="sc med_select-{{med_id}}" data-med_id="{{med_id}}" onChange={(e)=>{
                console.log('cccccccc ', e);
              }}>
                <option value="1+1+1">1+1+1</option>
                <option value="1+0+1">1+0+1</option>
                <option value="0+1+1">0+1+1</option>
                <option value="1+0+0">1+0+0</option>
                <option value="0+0+1">0+0+1</option>
                <option value="1+1+0">1+1+0</option>
              </select>
              <div className="med_when_action">
                <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">✓</button>
              </div>
            </div>
            {!isEditable && <h5 className='taking-time-{{med_id}}' style={{marginLeft: '20px'}}></h5>}
            <div className="taking_time select folded">
              <select className="meal med_meal-{{med_id}}" data-med_id="{{med_id}}">
                <option value={1}>After Meal</option>
                <option value={2}>Before Meal</option>
                <option value={3}>Take any time</option>
              </select>
              <div className="med_meal_action">
                <button data-med_id="{{med_id}}" className="btn btn-sm btn-success save">✓</button>
              </div>
            </div>
          </div>
          <div className="med_footer">
          {!isEditable && <h5 className='taking-for-{{med_id}} med_period'></h5>}
            <div className="period folded" style={{display: !isEditable?'block':'Hidden'}}>
              Take for <input className="med_period med_duration-{{med_id}}" type="text" data-med_id="{{med_id}}" placeholder="? days/weeks..." />
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
      <div style={{position: 'fixed', right:0, zIndex: 99999, padding: 20}}>
      <button style={{
        width: 'auto',
        padding: 10,
        fontSize: 14,
        color: 'rgba(0,0,0,0.7)',
        fontFamily: 'monospace',
        cursor: 'pointer',
        border: 'none',
        filter: 'drop-shadow(0.2rem 0.2rem 1rem rgba(0,0,0, 0.3))'
      }} onClick={()=>{
        collectInputsData();
      }}>Print Prescription</button>
      </div>
      {console.log('all med ', medicineList)}

    </div>

{/* <button style={{width: '300px', height:'50px', marginLeft: 'auto', marginRight: 'auto', background: 'rgba(0,0,0,0.2)', marginTop: '500px',}} onClick={()=>dPdf()}>Save Prescription</button> */}
</>
    
  )
}
