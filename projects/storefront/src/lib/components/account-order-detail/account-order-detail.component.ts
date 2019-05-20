import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';

import { notNullOrUndefined } from '../../common/utils/not-null-or-undefined';
import { GetOrder } from '../../generated-types';
import { DataService } from '../../providers/data/data.service';

import { GET_ORDER } from './account-order-detail.graphql';

@Component({
    selector: 'vsf-account-order-detail',
    templateUrl: './account-order-detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountOrderDetailComponent implements OnInit {

    order$: Observable<GetOrder.OrderByCode | null>;
    constructor(private dataService: DataService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.order$ = this.route.paramMap.pipe(
            map(pm => pm.get('code')),
            filter(notNullOrUndefined),
            switchMap(code => {
                return this.dataService.query<GetOrder.Query, GetOrder.Variables>(GET_ORDER, { code });
            }),
            map(data => data.orderByCode),
        );
    }

}
