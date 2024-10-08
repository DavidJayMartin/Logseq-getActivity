
let blockDate = '';


async function getJournalDateFromCurrentBlock() {
  const currentBlock = await logseq.App.getCurrentBlock(); // Get the currently selected block
  blockDate = '';
  if (currentBlock) {
    const page = await logseq.Editor.getPage(currentBlock.page.id); // Get the page details
    console.log(page["journal?"]);
    if (page["journal?"]) {
      blockDate = page.journalDay;
      
      console.log("This is a page with a date value. Date:", page.journalDay);
    } else {
      logseq.App.showMsg("This is not a journal page and does not have a date to reference.  The plug-in is looking to match a date for the page to the date of any activity in your account.", "error");
      return null;
    }
  } else {
    logseq.App.showMsg("No block is currently selected.", "error");
    return null;
  }
}

//Insert the activity to the block
async function getActivity (e) {
  logseq.Editor.insertBlock(e.uuid, `Hello World`, {before: true});

  getJournalDateFromCurrentBlock().then(() => {
    console.log(blockDate);
  });



  console.log('Activity Added to the Block')
}

const main = async () => {
  console.log('GetActivity Plugin Loaded');
    logseq.Editor.registerSlashCommand('Get Activity', async (e) => {
    getActivity(e)
  })
}

logseq.ready(main).catch(console.error);