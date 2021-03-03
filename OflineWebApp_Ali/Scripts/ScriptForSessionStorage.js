/// <reference path="jquery-3.3.1.min.js" />

$(document).ready(function () {
    contactsNamespace.initialize();
});

(function () {
    this.contactsNamespace = this.contactsNamespace || {};
    var ns = this.contactsNamespace;
    var currentRecord;

    ns.initialize = function () {
        $('#btnSave').on('click', ns.save);
        ns.display();
    };

    function retriveFromStorage() {
        var contactsJSON = sessionStorage.getItem('contacts');
        return contactsJSON ? JSON.parse(contactsJSON) : [];
    }
    ns.display = function () {
        $('#currentAction').html('Add Contact');
        currentRecord = { key: null, contact: {} };
        displayCurrentRecord();

        var result = retriveFromStorage();
        bindToGrid(result);
    };

    function bindToGrid(result) {
        var html = '';
        for (var i = 0; i < result.length; i++) {
            var contact = result[i];
            html += '<tr><td>' + contact.firstName + ' ' + contact.lastName + '</td>';
            html += '<td>' + contact.fatherName + '</td>';
            html += '<td>' + contact.motherName + '</td>';
            html += '<td>' + contact.birthDate + '</td>';
            html += '<td>' + contact.nid + '</td>';
            html += '<td>' + contact.traineeid + '</td>';
            html += '<td>' + contact.phoneNumber + '</td>';
            html += '<td>' + contact.email + '</td>';
            html += '<td>' + contact.fileUpload + '</td>';
            html += '<td> <a class="edit" href="javascript:void(0)" data-key=' + i + '>Edit</a></td></tr>';
        }
        html = html || '<tr><td colspan="3">No Records Avilable Here!!!</td></tr>';
        $('#contacts tbody').html(html);
        $('#contacts a.edit').on('click', ns.loadContact);
    }
    ns.loadContact = function () {
        var key = parseInt($(this).attr('data-key'));
        var result = retriveFromStorage();
        $('#currentAction').html('Edit Contact');
        currentRecord = { key: key, contact: result[key] };
        displayCurrentRecord();
    };

    function displayCurrentRecord() {
        var contact = currentRecord.contact;
        $('#firstName').val(contact.firstName);
        $('#lastName').val(contact.lastName);
        $('#fatherName').val(contact.fatherName);
        $('#motherName').val(contact.motherName);
        $('#birthDate').val(contact.birthDate);
        $('#nid').val(contact.nid);
        $('#traineeid').val(contact.traineeid);
        $('#email').val(contact.email);
        $('#phoneNumber').val(contact.phoneNumber);
        $('#fileUpload').val(contact.fileUpload);

    }



    ns.save = function () {
        var contact = currentRecord.contact;
        contact.firstName = $('#firstName').val();
        contact.lastName = $('#lastName').val();
        contact.email = $('#email').val();
        contact.phoneNumber = $('#phoneNumber').val();
        contact.fatherName = $('#fatherName').val();
        contact.motherName = $('#motherName').val();
        contact.birthDate = $('#birthDate').val();
        contact.nid = $('#nid').val();
        contact.traineeid = $('#traineeid').val();
        contact.phoneNumber = $('#phoneNumber').val();
        contact.fileUpload = $('#fileUpload').val();
        var results = retriveFromStorage();
        if (currentRecord.key !== null) {
            results[currentRecord.key] = contact;
        }
        else {
            results.push(contact);
        }
        sessionStorage.setItem('contacts', JSON.stringify(results));
        ns.display();

    };

})();