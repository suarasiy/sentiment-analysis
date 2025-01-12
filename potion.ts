interface Review {
  name: string;
  review: string;
  humanized_timestamp: string;
  stars: {
    label: string;
    value: number;
  };
}

/**
 * ### Step of Web Crawling (TL;DR)
 *
 * 1. Navigate to the exact url of google maps. Try to point the review tab and copy the url.
 * 2. (could be enhance) Set timeout to 7second to finish the default review fetching by google.
 * 3. (could be enhance) Target the reviews' container boxes, then automate to the end of scrolling.
 * 4. After scroll bumped the end, proceed await. Then check again if the data was summed, continuing to the scroll again.
 * 5. Do automate scroll to the end until it can't be scrolled anymore. Set timeout all process into 10minutes.
 * 6. After reached to the end of all reviews, do the web scraping based on formula that already wrote on a function.
 * 7. Finish.
 *
 * @author Sidiq Indrajati Yusuf
 */

const crawlingDom = () => {
  // DOM: container of each review representative
  // PS: note popular place wouldn't be able to get this auto-generated option sorter
  let reviewContainerAnchorByRefineReviews = document.querySelector(
    '[aria-label="Refine reviews"]'
  );
  let reviewContainerAnchorByCTASortParent = document.querySelector(
    '[aria-label="Sort reviews"]'
  )?.parentElement?.parentElement;

  let domReviewPane: Element | null = null;
  if (reviewContainerAnchorByRefineReviews) {
    domReviewPane = reviewContainerAnchorByRefineReviews;
  } else if (
    !reviewContainerAnchorByRefineReviews &&
    reviewContainerAnchorByCTASortParent
  ) {
    domReviewPane = reviewContainerAnchorByCTASortParent;
  }

  // note: please scroll inspector to the bottom, then perform crawling
  if (domReviewPane) {
    if (domReviewPane.nextElementSibling) {
      const reviews = domReviewPane.nextElementSibling.querySelectorAll(
        ":scope > [data-review-id]"
      );

      if (reviews.length <= 0) return null;

      const dataReview: Array<Review> = [];

      // iterate
      reviews.forEach((review) => {
        let authorName: string | null = null;
        let authorReview: string | null = null;
        let ariaStars: string | null = null;
        let authorTimestamp: string | null = null;
        /** @borrow elementor */
        let elem: HTMLCollection | HTMLElement | null = null;

        const scrReview: HTMLElement | null | undefined = review.querySelector(
          "[data-review-id]"
        )?.firstElementChild as HTMLElement;

        if (scrReview) {
          // get authors name
          /** @example 'Sidiq Indrajati Yusuf' */
          authorName =
            scrReview.children[1].querySelector("[data-review-id]")
              ?.textContent ?? null;

          // get stars aria-label
          /** @example '5 stars' */
          ariaStars =
            scrReview.children[3].firstElementChild?.children[0]?.getAttribute(
              "aria-label"
            ) ?? null;

          // get humanized_timestamp value
          /** @example result: 'a year ago' */
          authorTimestamp =
            scrReview.children[3].firstElementChild?.children[1]?.textContent ??
            null;

          // get review container
          // 1. check whether the review are actually trimmed.
          elem =
            scrReview.children[3]?.children[1]?.querySelector("[id]")
              ?.children ?? null;

          if (elem) {
            // get author's review text
            authorReview = elem[0].textContent;
            if (elem.length > 1) {
              // 1. call-to-action: proceed to automate click the next sibling button
              // write code here...
              let newReview = authorReview;
              if (elem[1]) {
                elem = elem[1] as HTMLElement;
                elem.click();
              }

              // TODO: probably need to be refetching again on this card only.
              // - out of scope.

              // 2. update the current review with expanded text.
              authorReview = newReview;
            }
          }
        }

        dataReview.push({
          name: authorName ?? "[no_author]",
          review: authorReview ?? "[no_review]",
          humanized_timestamp: authorTimestamp ?? "[no_humanized_timestamp]",
          stars: {
            label: ariaStars ?? "[no_stars]",
            value: ariaStars ? +ariaStars : 0,
          },
        });
      });
    }
  }

  // the default text review langauges is in English
};

// code property by Sidiq Indrajati Yusuf, 2024-present.
