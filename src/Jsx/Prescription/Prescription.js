import React from 'react';
import './style.css';

export default function Prescription() {
  return (
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
        <div className="med" style={{}}>
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
      </div>
    </div>
  )
}
