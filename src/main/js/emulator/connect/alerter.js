/**
 * Created by HizniS on 03/06/2014.
 */

/**
 * Emulation of MC alerter
 * @global {mcAlerter} Emulation of MC of MC message router
 */
var alerts = new mcAlerter();

/**
 * @constructor Constructs a mcAlerter Object that emulates the MC alerter
 */
function mcAlerter() {
    /**
     * @function Pretends to raise an alert
     * @param {string} alertMessage. The text of the alert to raise
     * @param {string} message. The message to be routed.
     */
    this.sendAlert = function (alertMessage) {
        print("[SEND ALERT DUMMY: " + alertMessage + "]");
    };
};

/**
 * @constructor Constructs an alertNotifier object that resembles the OHIS alert notifier
 */
function alertNotifier(id, dateTime, level) {

    this.Id = id;
    this.alertDt = dateTime;
    this.level = level;


    this.sms = new alert("SMS", undefined, undefined);
    this.email = new alert("EMAIL", undefined, undefined);
    this.console = new alert("CONSOLE", undefined, undefined);

    this.setSmsNotification = function (subject, text) {
        this.sms.subject = subject;
        this.sms.text = text;
    };

    this.setEmailNotification = function (subject, text) {
        this.email.subject = subject;
        this.email.text = text;
    };

    this.setConsoleNotification = function (subject, text) {
        this.console.subject = subject;
        this.console.text = text;
    };

    this.toString = function () {
        return this.sms.logOut() + '\n' + this.email.logOut() + '\n' + this.console.logOut();
    };

    this.toXml = function () {
        var xmlAlertString = "<ALERT><ID>" + this.Id + "</ID><DATETIME>" + this.alertDt + "</DATETIME><LEVEL><OLD/><NEW>" + this.level + "</NEW></LEVEL>";

        if (this.sms.subject) xmlAlertString += this.sms.toXmlNode();
        if (this.email.subject) xmlAlertString += this.email.toXmlNode();
        if (this.console) xmlAlertString += this.console.toXmlNode();

        xmlAlertString += "</ALERT>";

        return new XML(xmlAlertString);
    };

    this.sendAlerts = function () {
        logger.info(" ***** BEGIN SEND ALERTS\n" + this.toXml(), " END SEND ALERTS *****");
    };

    function alert(label, sub, txt) {
        this.label = label;
        this.subject = sub;
        this.text = txt;

        this.toXmlNode = function () {
            return "<" + this.label + "><SUBJECT>" + this.subject + "</SUBJECT><TEXT>" + this.text + "</TEXT></" + this.label + ">";
        };
    }
}