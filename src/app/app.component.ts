import { Component, OnInit } from '@angular/core';
declare var BarcodeReader: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  defaultReader;
  readerAutoClosed = false;

  logMsgElement;
  openButton;
  closeButton;

  barcodeDataText;
  symbTypeText;
  readTimeText;

  hidden;
  visibilityChange;

  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.setup();
  }

  setup() {
    this.openButton = document.getElementById("openButton");
    this.closeButton = document.getElementById("closeButton");
    this.logMsgElement = document.getElementById("logMsg");
    this.barcodeDataText = document.getElementById("BarcodeData");
    this.symbTypeText = document.getElementById("SymbType");
    this.readTimeText = document.getElementById("ReadTime");

    // Check whether the browser supports detection of the web page visibility.
    if (typeof document.hidden !== "undefined") { // Standard HTML5 attribute
      this.hidden = "hidden";
      this.visibilityChange = "visibilitychange";
    }

    if (this.hidden && typeof document.addEventListener !== "undefined" &&
      typeof document[this.hidden] !== "undefined") {
      // Add an event listener for the visibility change of the web page.
      document.addEventListener(this.visibilityChange, this.handleVisibilityChange, false);
    }
  }

  // After BarcodeReader object is created we can configure our symbologies and add our event listener
  onBarcodeReaderComplete(result) {
    if (result.status === 0) {
      // BarcodeReader object was successfully created
      this.logMsgElement.innerHTML = "<b>Log:</b><br>BarcodeReader object successfully created";
      this.updateUI(true, true);

      // Configure the symbologies needed. Buffer the settings and commit them at once.
      this.defaultReader.setBuffered("Symbology", "Code39", "Enable", "true", this.onSetBufferedComplete);
      this.defaultReader.setBuffered("Symbology", "Code128", "EnableCode128", "true", this.onSetBufferedComplete);
      this.defaultReader.commitBuffer(this.onCommitComplete);

      // Add an event handler for the barcodedataready event
      this.defaultReader.addEventListener("barcodedataready", this.onBarcodeDataReady, false);
      // Add an event handler for the window's beforeunload event
      window.addEventListener("beforeunload", this.onBeforeUnload);
    }
    else {
      this.defaultReader = null;
      this.logMsgElement.innerHTML += "<p style=\"color:red\">Failed to create BarcodeReader, status: " + result.status + ", message: " + result.message + "</p>";

      alert('Failed to create BarcodeReader, ' + result.message);
    }
  }

  // Verify the symbology configuration
  onSetBufferedComplete(result) {
    if (result.status !== 0) {
      this.logMsgElement.innerHTML += "<p style=\"color:red\">setBuffered failed, status: " + result.status + ", message: " + result.message + "</p>";
      this.logMsgElement.innerHTML += "<p>Family=" + result.family + " Key=" + result.key + " Option=" + result.option + "</p>";
    }
  }

  onCommitComplete(resultArray) {
    if (resultArray.length > 0) {
      for (var i = 0; i < resultArray.length; i++) {
        var result = resultArray[i];
        if (result.status !== 0) {
          this.logMsgElement.innerHTML += "<p style=\"color:red\">commitBuffer failed, status: " + result.status + ", message: " + result.message + "</p>";
          if (result.method === "getBuffered" || result.method === "setBuffered") {
            this.logMsgElement.innerHTML += "<p>Method=" + result.method +
              " Family=" + result.family + " Key=" + result.key +
              " Option=" + result.option + "</p>";
          }
        }
      } //endfor
    }
  }

  // Handle barcode data when available
  onBarcodeDataReady(data, type, time) {
    this.barcodeDataText.value = data;
    this.symbTypeText.value = type;
    this.readTimeText.value = time;
  }

  updateUI(readerOpened, clearData) {
    this.openButton.disabled = readerOpened;
    this.closeButton.disabled = !readerOpened;
    if (clearData) {
      this.barcodeDataText.value = "";
      this.symbTypeText.value = "";
      this.readTimeText.value = "";
    }
  }

  /**
   * If the browser supports visibility change event, we can close the
   * BarcodeReader object when the web page is hidden and create a new
   * instance of the BarcodeReader object when the page is visible. This
   * logic is used to re-claim the barcode reader in case another
   * application has claimed it when this page becomes hidden.
   */
  handleVisibilityChange() {
    if (document[this.hidden]) // The web page is hidden
    {
      this.closeBarcodeReader(true);
    }
    else // The web page is visible
    {
      if (this.readerAutoClosed) {
        // Note: If you switch to another tab and quickly switch back
        // to the current tab, the following call may have no effect
        // because the BarcodeReader may not be completely closed yet.
        // Once the BarcodeReader is closed, you may use the Open Reader
        // button to create a new BarcodeReader object.
        this.openBarcodeReader();
      }
    }
  }

  openBarcodeReader() {
    if (!this.defaultReader) {
      this.defaultReader = new BarcodeReader(null, this.onBarcodeReaderComplete);
    }
  }

  closeBarcodeReader(isAutoClose) {
    if (this.defaultReader) {
      this.readerAutoClosed = isAutoClose;
      this.defaultReader.close(result => {
        if (result.status === 0) {
          this.logMsgElement.innerHTML += "<p style=\"color:blue\">BarcodeReader successfully closed.</p>";
          this.defaultReader = null;
          this.updateUI(false, false);
          window.removeEventListener("beforeunload", this.onBeforeUnload);
        }
        else {
          this.logMsgElement.innerHTML += "<p style=\"color:red\">Failed to close BarcodeReader, status: " + result.status + ", message: " + result.message + "</p>";
        }
      });
    }
  }

  openButtonClicked() {
    this.openBarcodeReader();
  }

  closeButtonClicked() {
    this.closeBarcodeReader(false);
  }

  onBeforeUnload(e) {
    var message = "Please close BarcodeReader before leaving this page.";
    (e || window.event).returnValue = message;
    return message;
  }
}