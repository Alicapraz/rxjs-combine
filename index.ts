import { concat, endWith, forkJoin, Observable, of, startWith } from 'rxjs';

// concat ile içerisindeki observable ları birleştirebiliyoruz.
//dikkat etmemiz gereken nokta içerisinde interval gibi sonu olmayan değerler bulunduramaz.
concat(of(1, 2, 3), of(4, 5, 6), of(7, 8, 9)).subscribe(console.log);

//startWith başına ekliyor
const source$ = of('ali', 'ayca', 'said');
source$.pipe(startWith('can')).subscribe(console.log);

//endWith sonuna ekliyor
const source2$ = of(11, 22, 33);
source2$.pipe(endWith(44)).subscribe(console.log);

//forkJoin içine yazdığımız observable lar complete görmeli görmüyorsa içini yazdırmaz.
const ali$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.next('Ali');
    subscriber.complete();
  }, 3000);
});

const ayca$ = new Observable((subscriber) => {
  setTimeout(() => {
    subscriber.error('Failure');
  }, 5000);
});

forkJoin([ali$, ayca$]).subscribe({
  next: (value) => console.log(value),
  error: (err) => console.log('error', err),
});
